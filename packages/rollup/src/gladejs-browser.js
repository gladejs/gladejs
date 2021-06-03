import path from 'path'
import fs from 'fs-extra'

import execa from 'execa'
import bs from 'browser-sync'

import { CSS_FILTER, MARKO_ENTRY } from './gladejs-utils.js'

let browserSync = false
let legacyConfig = false
let staticCode, serverProc

const legacyInputId = '\0gladejs-legacy.js'

export function browser(mainOutput, publicPath) {
    const virtualStyles = {}
    let cssOutput, esmOutput

    return {
        name: 'gladejs/browser',

        options(options) {
            cssOutput = options.output[0].dir
            esmOutput = options.output[1].dir

            options.onwarn = silenceEmptyWarnings(options.onwarn)
        },

        buildStart(options) {
            Object.entries(options.input).forEach(([name, path]) => {
                this.emitFile({
                    type: 'chunk',
                    name: name + '.style',
                    id: path.slice(0, -6) + '.style',
                })
            })
        },

        resolveId(id, importer) {
            if (id.endsWith('.style') && !importer) {
                return { id, moduleSideEffects: 'no-treeshake' }
            }

            if (id.endsWith('.marko') && importer?.endsWith('.style')) {
                const resolved = path.join(importer, '..', id)

                return {
                    id: resolved.slice(0, -6) + '.style',
                    moduleSideEffects: 'no-treeshake',
                }
            }
        },

        load(id) {
            if (!id.endsWith('.style')) return
            let deferredResolve

            const promisedStyle = new Promise((resolve) => {
                deferredResolve = resolve
            })

            this.addWatchFile(id.slice(0, -6) + '.marko')
            promisedStyle.resolve = deferredResolve
            virtualStyles[id] = promisedStyle

            return promisedStyle
        },

        moduleParsed(module) {
            if (!module.id.endsWith('.marko')) return
            let importMatch

            const styleCode = []
            const importRegExp = /(import[^;'"]*['"]([^;'"]+)['"];)/g

            while ((importMatch = importRegExp.exec(module.code)) !== null) {
                if (
                    CSS_FILTER.test(importMatch[2]) ||
                    importMatch[2].endsWith('.marko')
                ) {
                    styleCode.push(importMatch[1])
                }
            }

            let styleId = module.id.slice(0, -6) + '.style'
            if (styleId.startsWith(MARKO_ENTRY)) {
                styleId = styleId.slice(MARKO_ENTRY.length)
            }

            virtualStyles[styleId].resolve(styleCode.join('\n'))
        },

        generateBundle(outputOptions, bundle) {
            if (outputOptions.dir === cssOutput) {
                const basePath = publicPath + cssOutput.slice(mainOutput.length)

                Object.values(bundle)
                    .filter((asset) => asset.type === 'asset')
                    .forEach((style) => {
                        style.entries = []
                        style.name = style.name.slice(0, -4)
                        style.filePath = `${basePath}/${style.fileName}`
                    })

                Object.values(bundle)
                    .filter((chunk) => chunk.type === 'chunk')
                    .forEach((style) => {
                        const styleAsset = searchByName(style.name, bundle)
                        if (styleAsset) styleAsset.isEntry = style.isEntry

                        style.imports.forEach((chunk) => {
                            const styleChunk = searchByName(
                                bundle[chunk].name,
                                bundle
                            )

                            if (styleChunk) {
                                styleChunk.entries.push(style.name.slice(0, -6))
                            }
                        })
                    })

                Object.values(bundle).forEach((style) => {
                    if (style.type === 'chunk') {
                        delete bundle[style.fileName]
                    } else if (style.name.endsWith('.style')) {
                        style.name = style.name.slice(0, -6)
                    }
                })
            }

            if (outputOptions.dir === esmOutput) {
                const basePath = publicPath + esmOutput.slice(mainOutput.length)

                Object.values(bundle).forEach((chunk) => {
                    if (chunk.type === 'chunk') {
                        if (
                            chunk.code.trim() !== '' &&
                            !chunk.name.endsWith('.style')
                        ) {
                            chunk.filePath = `${basePath}/${chunk.fileName}`

                            if (chunk.isEntry) {
                                chunk.source = chunk.code.replace(
                                    /(import[^;'"]*['"])(\.)(\/[^;'"]+['"];)/g,
                                    `$1${path.dirname(chunk.filePath)}$3`
                                )
                            }
                        } else delete bundle[chunk.fileName]
                    } else delete bundle[chunk.fileName]
                })
            }
        },

        async writeBundle(outputOptions, bundle) {
            if (outputOptions.dir === cssOutput) {
                Object.values(bundle).forEach((style) => {
                    if (style.type === 'asset' && style.isEntry) {
                        fs.remove(path.resolve(cssOutput, style.fileName))
                    }
                })
            }

            if (outputOptions.dir === esmOutput) {
                Object.values(bundle).forEach((chunk) => {
                    if (chunk.type === 'chunk' && chunk.isEntry) {
                        fs.remove(path.resolve(esmOutput, chunk.fileName))
                    }
                })
            }
        },

        async closeBundle() {
            if (!legacyConfig) {
                await staticServer(mainOutput, this.meta.watchMode)
            }
        },

        closeWatcher() {
            if (!legacyConfig && serverProc) serverProc.kill()
            if (!legacyConfig && browserSync) browserSync.exit()
        },
    }
}

export function legacy(mainOutput, publicPath) {
    let legacyInputCode
    legacyConfig = true

    return {
        name: 'gladejs/legacy',

        options(options) {
            legacyInputCode = Object.values(options.input).map(
                (page) => `import '\0marko-browser-entry:${page}';`
            )

            options.input = legacyInputId
        },

        resolveId(id, importer) {
            if (!importer && id === legacyInputId) return legacyInputId
        },

        load(id) {
            if (id === legacyInputId) return legacyInputCode.join('\n')

            if (CSS_FILTER.test(id)) return 'export default {};'
        },

        generateBundle(outputOptions, bundle) {
            const output = outputOptions.dir.slice(mainOutput.length)

            Object.values(bundle).forEach((legacy) => {
                if (legacy.code.trim()) {
                    legacy.type = 'asset'
                    legacy.source = legacy.code
                    legacy.filePath = `${publicPath}${output}/${legacy.fileName}`
                } else delete bundle[legacy.fileName]
            })
        },

        async closeBundle() {
            await staticServer(mainOutput, this.meta.watchMode)
        },

        closeWatcher() {
            if (serverProc) serverProc.kill()
            if (browserSync) browserSync.exit()
        },
    }
}

async function staticServer(output, isLive) {
    const staticFile = path.resolve(output, 'static.mjs')

    if (await fs.pathExists(staticFile)) {
        if (!staticCode) {
            staticCode = 'run().then(() => process.exit(0));'
            await fs.appendFile(staticFile, staticCode + '\n')
        }

        await execa.node(staticFile, [], { stdio: 'inherit' })

        if (isLive) {
            if (!browserSync) {
                browserSync = bs.create('gladejs-static')
                browserSync.init({ server: output })
            } else browserSync.reload()
        } else await fs.remove(staticFile)
    } else {
        const serverFile = path.resolve(output, 'server.mjs')

        if (isLive && (await fs.pathExists(serverFile))) {
            if (serverProc) serverProc.kill()

            serverProc = execa.node(serverFile, [path.basename(output)], {
                stdio: 'inherit',
            })

            if (!browserSync) {
                browserSync = bs.create('gladejs-server')
                browserSync.init({ proxy: 'localhost:8080' })
            } else browserSync.reload()
        }
    }
}

function silenceEmptyWarnings(onwarn) {
    return (warning, warner) => {
        if (warning.code !== 'EMPTY_BUNDLE') {
            onwarn ? onwarn(warning, warner) : warner(warning)
        }
    }
}

function searchByName(lookup, bundle) {
    return Object.values(bundle).find(
        (asset) => asset.type === 'asset' && asset.name === lookup
    )
}

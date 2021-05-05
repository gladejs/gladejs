import path from 'path'
import fs from 'fs-extra'

import execa from 'execa'
import bs from 'browser-sync'

import { CSS_FILTER } from './gladejs-utils.js'

let browserSync = false
let legacyConfig = false

const legacyInputId = '\0gladejs-legacy.js'

export function browser(mainOutput, publicPath) {
    let cssOutput, esmOutput

    return {
        name: 'gladejs/browser',

        options(options) {
            cssOutput = options.output[0].dir
            esmOutput = options.output[1].dir
        },

        generateBundle(outputOptions, bundle) {
            if (outputOptions.dir === cssOutput) {
                const basePath = publicPath + cssOutput.slice(mainOutput.length)

                Object.values(bundle).forEach((style) => {
                    if (style.type === 'asset') {
                        style.filePath = `${basePath}/${style.fileName}`
                    } else delete bundle[style.fileName]
                })
            }

            if (outputOptions.dir === esmOutput) {
                const basePath = publicPath + esmOutput.slice(mainOutput.length)

                Object.values(bundle).forEach((chunk) => {
                    if (chunk.type === 'chunk') {
                        if (chunk.code.trim()) {
                            chunk.filePath = `${basePath}/${chunk.fileName}`
                        } else delete bundle[chunk.fileName]
                    } else delete bundle[chunk.fileName]
                })
            }
        },

        async writeBundle(outputOptions, bundle) {
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
            if (browserSync) browserSync.exit()
        },
    }
}

async function staticServer(output, isLive) {
    const staticFile = path.resolve(output, 'static.mjs')
    if (!(await fs.pathExists(staticFile))) return

    if (!isLive) {
        const staticCode = '\n;(await run());process.exit(0);\n'
        await fs.appendFile(staticFile, staticCode)
    }

    await execa.node(staticFile)

    if (isLive) {
        if (!browserSync) {
            browserSync = bs.create('gladejs')
            browserSync.init({ server: output })
        } else browserSync.reload()
    } else await fs.remove(staticFile)
}

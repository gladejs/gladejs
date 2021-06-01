import path from 'path'
import fs from 'fs-extra'

import execa from 'execa'
import bs from 'browser-sync'

export function browser(mainOutput, publicPath) {
    let cssOutput, esmOutput, browserSync
    let staticCode, serverProc

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
            const staticFile = path.resolve(mainOutput, 'static.mjs')

            if (await fs.pathExists(staticFile)) {
                if (!staticCode) {
                    staticCode = 'run().then(() => process.exit(0));'
                    await fs.appendFile(staticFile, staticCode + '\n')
                }

                await execa.node(staticFile, [], { stdio: 'inherit' })

                if (this.meta.watchMode) {
                    if (!browserSync) {
                        browserSync = bs.create('gladejs-static')
                        browserSync.init({ server: mainOutput })
                    } else browserSync.reload()
                } else await fs.remove(staticFile)
            } else {
                const serverFile = path.resolve(mainOutput, 'server.mjs')

                if (this.meta.watchMode && (await fs.pathExists(serverFile))) {
                    if (serverProc) serverProc.kill()

                    serverProc = execa.node(
                        serverFile,
                        [path.basename(mainOutput)],
                        { stdio: 'inherit' }
                    )

                    if (!browserSync) {
                        browserSync = bs.create('gladejs-server')
                        browserSync.init({ proxy: 'localhost:8080' })
                    } else browserSync.reload()
                }
            }
        },

        closeWatcher() {
            if (serverProc) serverProc.kill()
            if (browserSync) browserSync.exit()
        },
    }
}

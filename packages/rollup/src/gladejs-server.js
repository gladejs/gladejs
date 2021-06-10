import url from 'url'
import path from 'path'

import fs from 'fs-extra'
import glob from 'fast-glob'

import execa from 'execa'

import { CSS_FILTER, registerTagLib } from './gladejs-utils.js'

export function server(input) {
    let markoTagLibs = false

    return {
        name: 'gladejs/server',

        async options(options) {
            input = path.resolve(input)

            if (!(await fs.pathExists(input))) {
                throw new Error(`Input "${input}" does not exist !`)
            }

            if ((await fs.stat(input)).isDirectory()) {
                options.output[0].entryFileNames = '[name].mjs'

                options.external.push(/\/node_modules\/.+\.[cm]?js(on)?$/)
                options.external.push('fs-extra', 'express', '@marko/express')

                if (await fs.pathExists(path.join(input, 'server.js'))) {
                    options.input = path.resolve(input, 'server.js')

                    if (process.env.VITE_ENV) {
                        return viteDevServer(input, options.input)
                    }
                } else {
                    if (await fs.pathExists(path.join(input, 'static.js'))) {
                        options.input = path.resolve(input, 'static.js')
                    } else {
                        const output = options.output[0].dir

                        const mode = {
                            isLive: this.meta.watchMode,
                            isVite: process.env.VITE_ENV,
                        }

                        options.input = await staticServer(input, output, mode)
                    }
                }
            } else {
                options.input = input
            }
        },

        buildStart() {
            if (!markoTagLibs) {
                registerTagLib()
                markoTagLibs = true
            }
        },

        load(id) {
            if (CSS_FILTER.test(id)) return 'export default {};'
        },
    }
}

async function staticServer(input, output, mode) {
    if (mode.isVite) return viteDevServer(input)

    const pages = await glob('**.marko', {
        ignore: ['**/components/**'],
        cwd: input,
    })

    if (pages.length === 0) {
        throw new Error(`Input "${input}" does not have any page !`)
    }

    const inputCode = []

    if (mode.isLive) {
        inputCode.push(`import express from 'express';`)
        inputCode.push(`import markoWare from '@marko/express';`, '')
    } else inputCode.push(`import fs from 'fs-extra';`, '')

    inputCode.push(...pages.map((p, i) => `import p${i} from './${p}';`), '')

    if (mode.isLive) {
        inputCode.push(`express().use(markoWare.default())`)
        inputCode.push(`  .use('/', express.static('${output}'))`)
    } else {
        inputCode.push(`export async function run() {`)
        inputCode.push(`    return Promise.all([`)
    }

    inputCode.push(
        ...pages.map((p, i) => {
            if (mode.isLive) {
                let pagePath = p.slice(0, -6)
                if (pagePath === 'index') pagePath = ''

                if (pagePath.endsWith('/index')) {
                    pagePath = pagePath.slice(0, -6)
                } else if (pagePath) pagePath += '.html'

                return `  .get('/${pagePath}', (_, r) => r.marko(p${i}, {}))`
            } else {
                const fileName = path.join(output, p.slice(0, -6) + '.html')

                return (
                    `        p${i}.render({}).then((r) => ` +
                    `fs.outputFile('${fileName}', r.getOutput())),`
                )
            }
        })
    )

    if (mode.isLive) {
        inputCode.push('  .listen(8080);', '')
    } else inputCode.push('    ]);', '}', '')

    const inputName = mode.isLive ? 'server' : 'static'
    const inputFile = path.resolve(input, inputName + '.mjs')

    await fs.outputFile(inputFile, inputCode.join('\n'))

    return inputFile
}

async function viteDevServer(input, serverFile) {
    if (serverFile === undefined) {
        serverFile = path.resolve(input, 'server.mjs')

        const viteServerFile = url.fileURLToPath(
            new URL('./vite-server.mjs', import.meta.url)
        )

        await fs.copy(viteServerFile, serverFile)
    }

    const serverProc = execa.node(serverFile, [path.basename(input)], {
        stdio: 'inherit',
    })

    try {
        await serverProc
    } finally {
        process.exit(0) // eslint-disable-line
    }
}

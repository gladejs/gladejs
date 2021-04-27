import url from 'url'
import path from 'path'

import fs from 'fs-extra'
import glob from 'fast-glob'

import { taglib } from '@marko/compiler'

const CSS_FILTER = /\.(css|less|s[ac]ss|styl)$/

export function server(input) {
    let assetTransform

    return {
        name: 'gladejs/server',

        async options(options) {
            input = path.resolve(input)
            if (!(await fs.pathExists(input))) {
                throw new Error(`Input "${input}" does not exist !`)
            }

            if ((await fs.stat(input)).isDirectory()) {
                if (await fs.pathExists(path.join(input, 'server.js'))) {
                    options.input = path.resolve(input, 'server.js')
                } else {
                    const output = options.output[0].dir
                    const isLive = this.meta.watchMode

                    options.input = await staticServer(input, output, isLive)
                    options.external = /\/node_modules\/.+\.[cm]?js(on)?$/
                    options.output[0].entryFileNames = '[name].mjs'
                }
            } else {
                options.input = input
            }
        },

        buildStart() {
            if (!assetTransform) {
                assetTransform = url.fileURLToPath(
                    new URL('./asset-transform.cjs', import.meta.url)
                )
                taglib.register('@gladejs/rollup', {
                    '<*>': { transformer: assetTransform },
                })
            }
        },

        load(id) {
            if (CSS_FILTER.test(id)) return 'export default {};'
        },
    }
}

async function staticServer(input, output, isLive) {
    const pages = await glob('**.marko', {
        ignore: ['**/components/**'],
        cwd: input,
    })

    if (pages.length === 0) {
        throw new Error(`Input "${input}" does not have any page !`)
    }

    let staticCode = `import fs from 'fs-extra';\n\n`

    pages.forEach((page, index) => {
        staticCode += `import page_${index} from './${page}';\n`
    })

    staticCode += `\nexport async function run() {\n  return Promise.all([\n`

    pages.forEach((page, index) => {
        staticCode += `    page_${index}.render({}).then(`
        staticCode += `result => fs.outputFile('${output}/`
        staticCode += page.substring(0, page.length - 6)
        staticCode += `.html', result.getOutput())),\n`
    })

    staticCode += `  ]);\n}\n`

    if (isLive) staticCode += `\n(await run());\nprocess.exit(0);\n`
    const staticFile = path.resolve(input, 'static.mjs')
    await fs.outputFile(staticFile, staticCode)

    return staticFile
}

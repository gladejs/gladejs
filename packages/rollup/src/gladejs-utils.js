import url from 'url'
import path from 'path'

import { taglib } from '@marko/compiler'

export const CSS_FILTER = /\.(css|less|s[ac]ss|styl)$/
export const MARKO_ENTRY = '\0marko-browser-entry:'

export function serializer() {
    return (bundle) =>
        bundle.map((chunk) =>
            chunk.type === 'asset'
                ? {
                      type: 'asset',
                      name: chunk.name,
                      fileName: chunk.fileName,
                      filePath: chunk.filePath,
                      entries: chunk.entries,
                      source: chunk.isEntry ? chunk.source.trim() : undefined,
                  }
                : {
                      type: 'chunk',
                      name: chunk.name,
                      fileName: chunk.fileName,
                      filePath: chunk.filePath,
                      imports: chunk.imports,
                      isDynamicEntry: chunk.isDynamicEntry,
                      dynamicImports: chunk.dynamicImports,
                      source: chunk.isEntry ? chunk.source.trim() : undefined,
                  }
        )
}

export function moduleChunking() {
    return (id) => {
        if (id.startsWith(path.resolve('components'))) return 'project'

        if (
            id.includes(path.join('/node_modules/marko/')) ||
            id.includes(path.join('/node_modules/raptor-util/')) ||
            (id.includes(path.join('/node_modules/')) && id.endsWith('.marko'))
        )
            return 'markojs'

        if (
            id.includes(path.join('/node_modules/')) ||
            id === '\0commonjsHelpers.js'
        )
            return 'modules'
    }
}

export function stylesChunking() {
    return (id) => {
        if (id.startsWith(path.resolve('components'))) return 'project'
        if (id.includes(path.join('/node_modules/'))) return 'modules'
    }
}

export function registerTagLib() {
    const assetTransform = url.fileURLToPath(
        new URL('./asset-transform.cjs', import.meta.url)
    )

    taglib.register('@gladejs/rollup', {
        '<*>': { transform: assetTransform },
    })
}

export function urlToMarkoFile(url) {
    if (url.endsWith('.html')) url = url.slice(0, -4) + 'marko'
    if (!url.split('/').pop().includes('.')) url += '/index.marko'
    if (url.endsWith('.marko')) url += '?marko-server-entry'

    return './' + url
}

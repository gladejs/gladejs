import path from 'path'

export function serializer() {
    return (bundle) =>
        bundle.map((chunk) =>
            chunk.type === 'asset'
                ? {
                      type: 'asset',
                      name: chunk.name,
                      fileName: chunk.fileName,
                      filePath: chunk.filePath,
                  }
                : {
                      type: 'chunk',
                      name: chunk.name,
                      fileName: chunk.fileName,
                      filePath: chunk.filePath,
                      imports: chunk.imports,
                      exports: chunk.exports,
                      isEntry: chunk.isEntry,
                      facadeModuleId: chunk.facadeModuleId,
                      isDynamicEntry: chunk.isDynamicEntry,
                      dynamicImports: chunk.dynamicImports,
                      source: chunk.isEntry
                          ? chunk.code
                                .replace(
                                    /(import[^;'"]*['"])(\.)(\/[^;'"]+['"];)/g,
                                    `$1${path.dirname(chunk.filePath)}$3`
                                )
                                .trim()
                          : undefined,
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

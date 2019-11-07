import path from 'path'
import glob from 'glob'

import 'marko/node-require'

export default () => {
  return {
    name: 'gladejs',

    options (options) {
      const input = path.resolve(options.input)

      const pages = glob.sync('*.marko', {
        cwd: input,
        absolute: true,
        matchBase: true,
        ignore: '**/components/**'
      })

      options.input = Object.fromEntries(new Map(pages.map(page =>
        [page.substring(input.length + 1, page.length - 6), page]
      )))

      const manualChunks = options.manualChunks
      options.manualChunks = (id) => {
        if (id.endsWith('|assets')) return 'assets'
        if (manualChunks) return manualChunks(id)
      }

      return options
    },

    generateBundle (_, bundle) {
      const assets = Object.values(bundle).find(entry => entry.name === 'assets')
      const assetPaths = new Function('assets', assets.code + 'return assets;')([]) // eslint-disable-line
      const assetReducer = (code, path) => code.replace(new RegExp(path[0], 'g'), path[1])

      const styles = Object.values(bundle).filter(entry =>
        entry.isAsset && entry.fileName.endsWith('.css')
      ).map(file =>
        ({ href: '/' + file.fileName, code: file.source })
      )

      Object.values(bundle).filter(entry =>
        entry.isEntry && entry.facadeModuleId.endsWith('.marko')
      ).forEach(file => {
        const tagIndex = file.facadeModuleId.indexOf(':')
        const pagePath = file.facadeModuleId.substring(tagIndex + 1)

        delete require.cache[pagePath]
        const template = require(pagePath)

        file.code = file.code.replace(new RegExp("import '.*/" + assets.fileName + "';"), '')
        const rendered = template.renderToString({ module: file, styles: styles })

        this.emitFile({
          type: 'asset',
          fileName: file.name + '.html',
          source: assetPaths.reduce(assetReducer, rendered)
        })
      })

      assets.code = ''
      Object.values(bundle).forEach(entry => {
        if (entry.code === '') delete bundle[entry.fileName]
      })

      Object.values(bundle).forEach(entry => {
        if (entry.type === 'chunk') {
          entry.code = assetPaths.reduce(assetReducer, entry.code)
        }
      })
    }
  }
}

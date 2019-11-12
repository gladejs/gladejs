import path from 'path'
import glob from 'glob'

import 'marko/node-require'

export function gladejs () {
  return {
    name: 'gladejs',

    options (options) {
      options.input = listMarkoPages(options.input)
      options.manualChunks = gladeChunking(options.manualChunks)
    },

    generateBundle (_, bundle) {
      const styles = listStyleAssets(bundle)

      const assets = Object.values(bundle).find(entry => entry.name === 'assets')
      const assetPaths = new Function('assets', assets.code + 'return assets;')([]) // eslint-disable-line
      const assetReducer = (code, path) => code.replace(new RegExp(path[0], 'g'), path[1])

      Object.values(bundle).filter(entry =>
        entry.isEntry && entry.facadeModuleId.endsWith('.marko')
      ).forEach(file => {
        file.code = file.code.replace(new RegExp("import '.*/" + assets.fileName + "';"), '')
        const rendered = getMarkoFacade(file).renderToString({ module: file, styles: styles })

        this.emitFile({
          type: 'asset',
          fileName: file.name + '.html',
          source: assetPaths.reduce(assetReducer, rendered)
        })
      })

      assets.code = ''
      Object.values(bundle).forEach(entry => {
        if (entry.code === '') delete bundle[entry.fileName]

        else if (entry.type === 'chunk') {
          entry.code = assetPaths.reduce(assetReducer, entry.code)
        }
      })
    }
  }
}

export function browsersync (config) {
  const bs = require('browser-sync').create()

  return {
    name: 'browser-sync',
    writeBundle () {
      if (!bs.active) bs.init(config)
    }
  }
}

function listMarkoPages (inputDir) {
  const pages = glob.sync('*.marko', {
    cwd: inputDir,
    absolute: true,
    matchBase: true,
    ignore: '**/components/**'
  })

  return Object.fromEntries(new Map(pages.map(page =>
    [page.substring(inputDir.length + 1, page.length - 6), page]
  )))
}

function gladeChunking (userChunks) {
  return (id) => {
    if (id.endsWith('|assets')) return 'assets'
    if (userChunks) return userChunks(id)

    else {
      if (id.startsWith(path.resolve('components'))) return 'js/components'
      if (id.includes('/node_modules/')) return 'js/packages'
    }
  }
}

function listStyleAssets (bundle) {
  return Object.values(bundle).filter(entry =>
    entry.isAsset && entry.fileName.endsWith('.css')
  ).map(file =>
    ({ href: '/' + file.fileName, code: file.source })
  )
}

function getMarkoFacade (entry) {
  const tagIndex = entry.facadeModuleId.indexOf(':')
  const pagePath = entry.facadeModuleId.substring(tagIndex + 1)

  delete require.cache[pagePath]
  return require(pagePath)
}

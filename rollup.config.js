import path from 'path'

import marko from '@marko/rollup'
import gladejs from './rollup-plugin'

import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import url from 'rollup-plugin-url'
import json from 'rollup-plugin-json'
import postcss from 'rollup-plugin-postcss'
import visualizer from 'rollup-plugin-visualizer'

const SOURCE_DIR = path.resolve('pages')
const OUTPUT_DIR = path.resolve('build')

const isLive = process.env.ROLLUP_WATCH === 'true'
const isProd = isLive ? false : process.env.NODE_ENV === 'production'

const plugins = [
  domdatafix(), // Move on, this is just a quick fix & shall be deleted soon.
  marko({ hydrate: true }), // We are doing SSR, so let's stay well hydrated !

  // @docs "https://github.com/rollup/rollup-plugin-node-resolve#usage"
  resolve({
    browser: true, // we are indeed building for the browser
    preferBuiltins: false, // and hence do not have builtins
    extensions: ['.mjs', '.js', '.json', '.node', '.marko']
  }),

  // @docs "https://github.com/rollup/rollup-plugin-commonjs#usage"
  commonjs({
    include: /node_modules/, // let's limit this to node
    extensions: ['.js', '.marko'] // and add Marko files
  }),

  // @docs "https://github.com/rollup/rollup-plugin-url#options"
  url({
    limit: 7 * 1024, // inline files < 7 kb, copy the rest
    sourceDir: SOURCE_DIR, // to get the correct [dirname]
    fileName: '/assets/[dirname][name]-[hash][extname]',
    include: ['**/*.svg', '**/*.png', '**/*.jpe?g', '**/*.gif']
  }),

  // @docs "https://github.com/rollup/rollup-plugin-json#usage"
  json({
    namedExports: true, // we name each JSON property
    preferConst: true // and prefer "const" to "var"
  }),

  // @docs "https://github.com/egoist/rollup-plugin-postcss#options"
  postcss({
    plugins: [], // pick yours @ "https://www.postcss.parts"
    minimize: isProd, // apply "cssnano" in production
    extract: OUTPUT_DIR + '/css/styles.css'
  }),

  gladejs(), // Our plugin is "last" to get access to the finished bundle.

  // @docs "https://github.com/btd/rollup-plugin-visualizer#options"
  isProd && visualizer({
    filename: 'rollup_stats.html', // the graph file, to commit or not
    open: false, // usefull when adjusting bundle chunks distribution
    template: 'sunburst', // 'sunburst', 'treemap' or 'circlepacking'
    bundlesRelative: false // group all bundles into one graph or not
  }),

  // @docs "https://www.browsersync.io/docs/options"
  isLive && browsersync({
    open: false, // pick one => 'ui', 'local' or 'external'
    watch: true, // watching is kind of the whole point here
    notify: false, // maybe you like notifications, I don't
    server: OUTPUT_DIR // obviously we are serving the output
  })
]

export default {
  input: SOURCE_DIR,
  plugins: plugins,

  output: {
    format: 'esm',
    dir: OUTPUT_DIR
  },

  watch: {
    chokidar: false,
    exclude: /node_modules/
  },

  manualChunks (id) {
    if (id.startsWith(path.resolve('components'))) return 'js/components'
    if (id.includes('/node_modules/marko/')) return 'js/marko'
    if (id.includes('/node_modules/')) return 'js/other'
  }
}

function browsersync (config) {
  const bs = require('browser-sync').create()
  return {
    name: 'browser-sync',
    writeBundle () {
      if (!bs.active) bs.init(config)
    }
  }
}

function domdatafix () {
  return {
    name: 'dom-data-fix',
    transform (code, id) {
      if (!id.endsWith('/runtime/components/dom-data.js')) return null
      return code.replace(' require("./util").___runtimeId;',
        ' (window.$MUID || (window.$MUID = { i: 0 })).i++;')
    }
  }
}

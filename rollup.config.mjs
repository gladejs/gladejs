import path from 'path'

import marko from '@marko/rollup'
import gladejs from '@gladejs/rollup'

import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import url from '@rollup/plugin-url'
import json from '@rollup/plugin-json'

import postcss from 'rollup-plugin-postcss'
import { terser } from 'rollup-plugin-terser'
import gzip from 'rollup-plugin-gzip'
import { brotliCompressSync } from 'zlib'
import visualizer from 'rollup-plugin-visualizer'

import htmlminifier from '@gladejs/rollup/dist/html-minifier'
import browsersync from '@gladejs/rollup/dist/browser-sync'

const SOURCE_DIR = path.resolve('pages')
const OUTPUT_DIR = path.resolve('build')

const isLive = process.env.ROLLUP_WATCH === 'true'
const isProd = process.env.NODE_ENV === 'production'

const plugins = [
  marko({ hydrate: true }), // We are doing SSR, so let's stay well hydrated !

  // @docs "https://github.com/rollup/plugins/tree/master/packages/node-resolve#options"
  resolve({
    browser: true, // we are indeed building for the browser
    preferBuiltins: false, // and hence do not have builtins
    extensions: ['.mjs', '.cjs', '.js', '.json', '.node', '.marko']
  }),

  // @docs "https://github.com/rollup/plugins/tree/master/packages/commonjs#options"
  commonjs({
    include: /node_modules/, // let's limit this to NodeJS
    extensions: ['.cjs', '.js'] // and only CommonJS files
  }),

  // @docs "https://github.com/rollup/plugins/tree/master/packages/url#options"
  url({
    limit: 7 * 1024, // inline files < 7 kb, copy the rest
    sourceDir: SOURCE_DIR, // to get the correct [dirname]
    publicPath: '', // add it also to your <base href> tag
    fileName: '/assets/[dirname][name]-[hash][extname]',
    include: ['**/*.svg', '**/*.png', '**/*.jpe?g', '**/*.gif']
  }),

  // @docs "https://github.com/rollup/plugins/tree/master/packages/json#options"
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

  // @docs "https://github.com/TrySound/rollup-plugin-terser#options"
  isProd && terser({
    ecma: 2018, // pick the vintage (ECMAScript 9 should be safe)
    mangle: true, // turn it off to get readable stacktraces back
    nameCache: {}, // we use the same object cache for all chunks

    // @docs "https://terser.org/docs/api-reference#compress-options"
    compress: {
      passes: 3, // number of times to compress, 3 is probably plenty
      inline: 3, // level of function calls to inline => [0, 1, 2, 3]
      unused: true, // turn it off if you are missing some javascript
      unsafe: false // turn it on at your own peril (seems OK though)
    }
  }),

  gladejs(process.env), // We are "last" to get access to the finished bundle.

  // @docs "https://github.com/kangax/html-minifier#options-quick-reference"
  isProd && htmlminifier({
    removeComments: false, // Marko relies on HTML comments, so DO NOT remove them
    collapseWhitespace: false, // Marko already does it and better, so don't bother

    // This is pretty standard, but most options are disabled by default.
    caseSensitive: true, // may be useful for custom HTML elements attributes
    decodeEntities: true, // use direct Unicode characters whenever possible
    useShortDoctype: true, // replace the doctype with the short HTML5 doctype
    keepClosingSlash: true, // keep the trailing slash on singleton elements
    includeAutoGeneratedTags: true, // insert tags generated by the HTML parser
    collapseBooleanAttributes: true, // omit attribute values from boolean attributes
    preventAttributesEscaping: true, // prevent the escaping of values of attributes
    processConditionalComments: true, // process the contents of conditional comments

    // These options should be pretty safe and can be enabled by default.
    sortAttributes: true, // sort attributes by frequency to improve compression
    removeRedundantAttributes: true, // remove attributes when value matches default
    removeScriptTypeAttributes: true, // remove type="text/javascript" from script tags
    removeStyleLinkTypeAttributes: true, // remove type="text/css" from style & link tags

    // Those options are the way to the "Danger Zone", thread with care !
    sortClassName: false, // sort style classes by frequency to improve compression
    removeOptionalTags: false, // remove optional tags like HTML, HEAD, BODY, ...
    removeAttributeQuotes: false, // remove quotes around attributes when possible
    removeEmptyAttributes: false // remove attributes with whitespace-only values
  }),

  // @docs "https://github.com/kryops/rollup-plugin-gzip#configuration"
  isProd && gzip({
    minSize: 1024, // skip files < 1kb
    filter: /\.(js|css|html|json)$/
  }),

  // @docs "https://github.com/kryops/rollup-plugin-gzip#brotli-compression"
  isProd && gzip({
    fileName: '.br', // Brotli this time
    minSize: 1024, // skip files < 1kb
    filter: /\.(js|css|html|json)$/,
    customCompression: content =>
      brotliCompressSync(Buffer.from(content))
  }),

  // @docs "https://github.com/btd/rollup-plugin-visualizer#options"
  !isLive && visualizer({
    template: 'treemap', // pick your graphic: 'sunburst' or 'treemap'
    open: false, // usefull when adjusting bundle chunks distribution
    filename: 'rollup_stats.html' // the graph file, to commit or not
  }),

  // @docs "https://www.browsersync.io/docs/options"
  isLive && browsersync({
    open: false, // pick one => 'ui' or 'local' or 'external'
    watch: true, // watching is kind of the whole point here
    notify: false, // maybe you like notifications, I don't
    server: OUTPUT_DIR // obviously we are serving the output
  })
]

export default {
  input: SOURCE_DIR,
  plugins: plugins,

  output: {
    dir: OUTPUT_DIR,
    format: 'module'
  }
}

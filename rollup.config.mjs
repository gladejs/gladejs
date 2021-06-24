import marko from '@marko/rollup'
import gladejs from '@gladejs/rollup'
import eleventy from '@gladejs/eleventy'

import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

import babel from '@rollup/plugin-babel'
import assets from '@rollup/plugin-url'

import styles from 'rollup-plugin-styles'
import { terser } from 'rollup-plugin-terser'

const SOURCE_DIR = process.env.GLADEJS_SOURCE_DIR ?? 'pages'
const BUILD_DIR = process.env.GLADEJS_BUILD_DIR ?? 'build'
const OUTPUT_DIR = process.env.GLADEJS_OUTPUT_DIR ?? '_site'

const PUBLIC_PATH = process.env.GLADEJS_PUBLIC_PATH ?? ''

const IMAGE_ASSETS = '**/*.(svg|ico|webp|avif|png|jpe?g|gif)'
const MEDIA_ASSETS = '**/*.(mp4|mp3|webm|flac|ogg|aac|wav)'
const OTHER_ASSETS = '**/*.(ttf|otf|eot|woff2?|wasm)'

const isProd = process.env.NODE_ENV === 'production'

// @docs https://github.com/Anidetrix/rollup-plugin-styles#configuration
const stylesOptions = {
    mode: ['extract'], // generates static CSS files
    minimize: isProd, // using CSSnano in production
    url: {
        inline: false, // ... or copy into ...
        publicPath: PUBLIC_PATH + '/css/assets/',
        hash: '/assets/[name]-[hash][extname]',
    },
}

// @docs https://github.com/rollup/plugins/tree/master/packages/url#options
const assetsOptions = [
    {
        limit: 7 * 1024, // inline files < 7 kb, copy the rest
        sourceDir: BUILD_DIR, // to get the correct [dirname]
        publicPath: PUBLIC_PATH, // to get the correct path
        fileName: '/assets/[dirname][name]-[hash][extname]',
        include: [IMAGE_ASSETS, MEDIA_ASSETS, OTHER_ASSETS],
    },
]

// @docs https://github.com/TrySound/rollup-plugin-terser#options
const terserOptions = (format) => {
    return {
        ecma: format === 'cjs' ? 2015 : 2020, // choosing the vintage
        mangle: true, // turn it off to get readable stacktraces back
        nameCache: {}, // we use the same object cache for all chunks

        // @docs https://terser.org/docs/api-reference#compress-options
        compress: {
            passes: 3, // number of times to compress, 3 is probably plenty
            inline: 3, // level of function calls to inline => [0, 1, 2, 3]
            unused: true, // turn it off if you are missing some javascript
            unsafe: false, // turn it on at your own peril (seems OK though)
        },
    }
}

const serverConfig = {
    output: { dir: OUTPUT_DIR },
    plugins: [
        eleventy(SOURCE_DIR, BUILD_DIR),
        gladejs.server(BUILD_DIR),
        marko.default.server(),

        resolve({ preferBuiltins: true }),
        commonjs({ include: /node_modules/ }),
        ...assetsOptions.map((o) => assets(o)),
    ],
    watch: { exclude: BUILD_DIR + '/{static,server}.?js' },
}

const browserConfig = {
    plugins: [
        styles(stylesOptions),
        gladejs.browser(OUTPUT_DIR, PUBLIC_PATH),
        marko.default.browser({ serialize: gladejs.serializer() }),

        resolve({ preferBuiltins: false, browser: true }),
        commonjs({ include: /node_modules/ }),
        ...assetsOptions.map((o) => assets({ emitFiles: false, ...o })),
    ],
    output: [
        {
            dir: OUTPUT_DIR + '/css',
            assetFileNames: '[name]-[hash].css',
            manualChunks: gladejs.stylesChunking(),
        },
        {
            dir: OUTPUT_DIR + '/esm',
            chunkFileNames: '[name]-[hash].js',
            manualChunks: gladejs.moduleChunking(),
            plugins: [isProd && terser(terserOptions())],
        },
    ],
}

const legacyConfig = isProd && {
    plugins: [
        marko.default.browser({ serialize: gladejs.serializer() }),
        gladejs.legacy(OUTPUT_DIR, PUBLIC_PATH),
        isProd && terser(terserOptions('cjs')),

        resolve({ preferBuiltins: false, browser: true }),
        commonjs({ include: /node_modules/ }),
        ...assetsOptions.map((o) => assets({ emitFiles: false, ...o })),
    ],
    output: {
        dir: OUTPUT_DIR + '/cjs',
        entryFileNames: 'legacy-[hash].js',
        plugins: [
            babel.getBabelOutputPlugin({
                targets: 'IE >= 11, since 2015, defaults',
                presets: [['@babel/env', { modules: 'cjs' }]],
            }),
        ],
    },
}

export default [serverConfig, browserConfig, legacyConfig].filter((c) => c)

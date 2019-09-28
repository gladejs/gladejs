import path from 'path';

import marko from '@marko/rollup';
import gladejs from './rollup-plugin.js';

import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import postcss from 'rollup-plugin-postcss';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import visualizer from 'rollup-plugin-visualizer';

const OUTPUT_DIR = path.resolve('build');

const isLive = process.env.ROLLUP_WATCH === 'true';
const isProd = isLive ? false : process.env.NODE_ENV === 'production';

function domdatafix() {
    return {
        name: 'dom-data-fix',
        transform(code, id) {
            if (!id.endsWith('/runtime/components/dom-data.js')) return null;
            return code.replace('require.resolve("./dom-data");', 'navigator.appVersion;');
        }
    };
}

const plugins = [
    domdatafix(),
    marko({ hydrate: true }),
    resolve({
        browser: true,
        preferBuiltins: false,
        extensions: ['.mjs', '.js', '.json', '.node', '.marko']
    }),
    commonjs({
        include: /node_modules/,
        extensions: ['.js', '.marko']
    }),
    json({ compact: isProd }),
    postcss({ extract: OUTPUT_DIR + '/styles.css' }),
    gladejs(),
    isLive && serve(OUTPUT_DIR),
    isLive && livereload(OUTPUT_DIR),
    !isProd && visualizer({ filename: OUTPUT_DIR + '/bundle.stats.html' })
];

export default {
    input: 'pages',
    plugins: plugins,

    output: {
        format: 'esm',
        dir: OUTPUT_DIR
    },

    watch: {
        chokidar: false,
        exclude: /node_modules/
    },

    manualChunks(id) {
        if (id.startsWith(path.resolve('components'))) return 'js/components';
        if (id.includes('/node_modules/marko/')) return 'js/marko';
        if (id.includes('/node_modules/')) return 'js/other';
    }
};

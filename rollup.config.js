import path from 'path';

import marko from '@marko/rollup';
import gladejs from './rollup-plugin';

import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import url from 'rollup-plugin-url';
import json from 'rollup-plugin-json';
import postcss from 'rollup-plugin-postcss';
import visualizer from 'rollup-plugin-visualizer';

const SOURCE_DIR = path.resolve('pages');
const OUTPUT_DIR = path.resolve('build');

const isLive = process.env.ROLLUP_WATCH === 'true';
const isProd = isLive ? false : process.env.NODE_ENV === 'production';

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
    url({
        limit: 10 * 1024, // inline files < 10 kb
        fileName: '/assets/[name]-[hash][extname]'
    }),
    json({ compact: isProd }),
    postcss({ extract: OUTPUT_DIR + '/css/styles.css' }),
    gladejs(),
    // @ "https://www.browsersync.io/docs/options" for the full list of options
    isLive && browsersync({
        open: false, // Pick one => 'ui', 'local' or 'external'
        watch: true, // Watching is kind of the whole point here
        notify: false, // Maybe you like notifications, I don't
        server: OUTPUT_DIR // Obviously we are serving the output
    }),
    !isProd && visualizer({ filename: OUTPUT_DIR + '/bundle.stats.html' })
];

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

    manualChunks(id) {
        if (id.startsWith(path.resolve('components'))) return 'js/components';
        if (id.includes('/node_modules/marko/')) return 'js/marko';
        if (id.includes('/node_modules/')) return 'js/other';
    }
};

function browsersync(config) {
    const bs = require('browser-sync').create();
    return {
        name: 'browser-sync',
        writeBundle() {
            if (!bs.active) bs.init(config);
        }
    };
}

function domdatafix() {
    return {
        name: 'dom-data-fix',
        transform(code, id) {
            if (!id.endsWith('/runtime/components/dom-data.js')) return null;
            return code.replace('require.resolve("./dom-data");', 'navigator.appVersion;');
        }
    };
}

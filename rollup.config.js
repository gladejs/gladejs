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
    domdatafix(), // Move on, this is just a quick fix & shall be deleted soon.
    marko({ hydrate: true }), // We are doing SSR, so let's stay well hydrated !

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

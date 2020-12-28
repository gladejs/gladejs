'use strict'

module.exports = function (config) {
    const minify = require('html-minifier').minify

    return {
        name: 'html-minifier',

        generateBundle(_, bundle) {
            Object.values(bundle)
                .filter((entry) => entry.fileName.endsWith('.html'))
                .forEach((file) => (file.source = minify(file.source, config)))
        },
    }
}

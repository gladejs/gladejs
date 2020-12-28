'use strict'

module.exports = function (config) {
    const bs = require('browser-sync').create()

    return {
        name: 'browser-sync',

        writeBundle() {
            if (!bs.active) bs.init(config)
        },
    }
}

'use strict'

module.exports = function (eleventyConfig) {
    eleventyConfig.setDataDeepMerge(true)

    return {
        dir: {
            data: '../datastores',
            layouts: '../layouts',
            includes: '../includes',
        },
    }
}

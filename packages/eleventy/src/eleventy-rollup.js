import url from 'url'
import path from 'path'

import fs from 'fs-extra'
import glob from 'fast-glob'

import chokidar from 'chokidar'
import normalize from 'normalize-path'

import Eleventy from '@11ty/eleventy/src/Eleventy.js'

const isLive = process.env.ROLLUP_WATCH === 'true'

export default function (input, output) {
    let eleventy = false

    return {
        name: 'eleventy',

        async options(options) {
            if (eleventy !== false) return

            input = path.resolve(input)
            output = path.resolve(output)

            if (!(await fs.pathExists(input))) {
                throw new Error(`Input "${input}" should exist first.`)
            }
            if ((await fs.readdir(input)).length === 0) {
                throw new Error(`Input "${input}" is empty, job done.`)
            }

            // Eleventy doesn't like win32 paths even on Windows.
            input = normalize(input).replace(/^([a-zA-Z]+:)/, '')
            output = normalize(output).replace(/^([a-zA-Z]+:)/, '')

            eleventy = new Eleventy(input, output)

            eleventy.setIsVerbose(false) // be quiet, no need to list all the files
            eleventy.setIncrementalBuild(true) // fewer builds in Live mode, please

            const configPath = new URL('./eleventy-config.cjs', import.meta.url)
            eleventy.setConfigPathOverride(url.fileURLToPath(configPath))

            return eleventyPromise(input, output, eleventy).then(() => options)
        },
    }
}

async function eleventyPromise(input, output, eleventy) {
    return eleventy.init().then(() => {
        const templates = eleventy.eleventyFiles.getGlobWatcherFiles()
        const dataFiles =
            eleventy.eleventyFiles.getGlobWatcherTemplateDataFiles()

        const eleventing = isLive ? eleventy.watch() : eleventy.write()

        /* eslint-disable promise/no-nesting */
        const writing = eleventing.then(() => renameHTMLFiles(output))
        const copying = dataFiles.then((watchList) =>
            copyUn11tyFiles(input, output, watchList.concat(templates))
        )
        /* eslint-enable promise/no-nesting */

        return Promise.all([copying, writing])
    })
}

async function copyUn11tyFiles(rootDir, destDir, watchList) {
    const files = await glob('**', {
        cwd: rootDir,
        absolute: true,
        ignore: watchList,
    })

    const copy = (file) => {
        const dest = destDir + file.substring(rootDir.length)
        return fs.ensureDir(path.dirname(dest)).then(() => fs.copy(file, dest))
    }

    return Promise.all(files.map(copy)).then(() => {
        if (isLive) {
            const options = { ignoreInitial: true, ignored: watchList }
            const watcher = chokidar.watch(rootDir, options)

            return watcher.on('add', copy).on('change', copy)
        } else return undefined
    })
}

async function renameHTMLFiles(rootDir) {
    const files = await glob('**.html', {
        cwd: rootDir,
        absolute: true,
    })

    const move = (file) => {
        const base = file.substring(0, file.length - 4)
        return fs.rename(file, base + 'marko')
    }

    return Promise.all(files.map(move)).then(() => {
        if (isLive) {
            const watcher = chokidar.watch(rootDir + '/**/*.html', {
                ignoreInitial: true,
            })

            return watcher.on('add', move).on('change', move)
        } else return undefined
    })
}

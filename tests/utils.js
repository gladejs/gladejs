'use strict'

const fs = require('fs-extra')
const path = require('path')
const execa = require('execa')

exports.runRollup = function (confFile, envVar = {}) {
    let rollupCmd = 'rollup -c ' + path.join(confFile)

    const envVars = Object.entries(envVar).map((env) => `${env[0]}:${env[1]}`)
    if (envVars.length > 0) rollupCmd += ' --environment ' + envVars.join(',')

    return executeCommand(rollupCmd)
}

exports.runCleanup = function (...pathList) {
    return executeCommand('rimraf ' + pathList.join(' '))
}

function executeCommand(command) {
    return execa.command(command, { preferLocal: true })
}

exports.writeFile = function (filePath, content) {
    return fs.outputFile(path.join(filePath), content)
}

exports.readFile = function (filePath) {
    return fs.readFile(path.join(filePath), 'utf-8')
}

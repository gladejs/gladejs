'use strict'

const path = require('path')
const execa = require('execa')

function executeCommand(command) {
    return execa.command(command, { preferLocal: true })
}

exports.runRollup = function (confFile, envVar = {}) {
    let rollupCmd = 'rollup -c ' + path.join(confFile)

    const envVars = Object.entries(envVar).map((env) => `${env[0]}:${env[1]}`)
    if (envVars.length > 0) rollupCmd += ' --environment ' + envVars.join(',')

    return executeCommand(rollupCmd)
}

exports.runCleanup = function (...pathList) {
    return executeCommand('rimraf ' + pathList.join(' '))
}

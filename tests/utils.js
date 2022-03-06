import url from 'url'
import path from 'path'

import fs from 'fs-extra'
import { execaCommand } from 'execa'

function runRollup(confFile, envVar = {}) {
    let rollupCmd = 'rollup -c ' + path.join(confFile)

    const envVars = Object.entries(envVar).map((env) => `${env[0]}:${env[1]}`)
    if (envVars.length > 0) rollupCmd += ' --environment ' + envVars.join(',')

    return executeCommand(rollupCmd)
}

function runCleanup(...pathList) {
    return executeCommand('rimraf ' + pathList.join(' '))
}

function executeCommand(command) {
    return execaCommand(command, { preferLocal: true })
}

function writeFile(filePath, content) {
    return fs.outputFile(path.join(filePath), content)
}

function readFile(filePath) {
    return fs.readFile(path.join(filePath), 'utf-8')
}

function processDir(metaUrl) {
    process.chdir(path.dirname(url.fileURLToPath(new URL(metaUrl))))
}

export default { runRollup, runCleanup, writeFile, readFile, processDir }

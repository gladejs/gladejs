'use strict'

const execa = require('execa')

exports.executeCommand = function (command) {
    return execa.command(command, { preferLocal: true })
}

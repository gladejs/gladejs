'use strict'

const path = require('path')
const normalize = require('normalize-path')

module.exports = function transform(a, b) {
    return a.hub ? transformMarko5(a, a.hub.file) : transformMarko4(a, b)
}

function transformMarko4(el, context) {
    if (
        el.hasAttribute('src') &&
        el.getAttributeValue('src').type === 'Literal'
    ) {
        const sourcePath = el.getAttributeValue('src').value

        if (sourcePath.startsWith('.')) {
            const systemPath = getSystemPath(context.filename, sourcePath)
            el.setAttributeValue('src', context.builder.literal(systemPath))

            if (context.outputType === 'vdom') {
                context.addDependency(
                    getDependency(context.filename, systemPath)
                )
            }
        }
    }
}

function transformMarko5(path, file) {
    const babelTypes = require('@marko/babel-types')
    const srcAttr = path.node.attributes.find((attr) => attr.name === 'src')

    if (srcAttr && srcAttr.value.type === 'StringLiteral') {
        const fileName = file.opts.sourceFileName
        const sourcePath = srcAttr.value.value

        if (sourcePath.startsWith('.')) {
            const systemPath = getSystemPath(fileName, sourcePath)
            srcAttr.value = babelTypes.types.stringLiteral(systemPath)

            if (file.markoOpts.output === 'vdom') {
                file.metadata.marko.deps.push(
                    getDependency(fileName, systemPath)
                )
            }
        }
    }
}

function getSystemPath(markoPath, assetPath) {
    const resolvedPath = path.resolve(path.dirname(markoPath), assetPath)
    return normalize(resolvedPath).replace(/^([a-zA-Z]+:|\.\/)/, '')
}

function getDependency(markoPath, assetPath) {
    const assetCode =
        `import assetPath from '${assetPath}';\n` +
        `assets.push(['${assetPath}', assetPath]);`

    return {
        type: 'asset',
        code: assetCode,
        path: markoPath,
        virtualPath: assetPath + '|assets',
    }
}

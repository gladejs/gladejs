'use strict'

const markoUtils = require('@marko/babel-utils')

const CSS_FILTER = /\.(css|less|s[ac]ss|styl)$/

const ASSET_TAGS = {
    link: 'href',
    object: 'data',
    video: 'poster',
    body: 'background',
}

module.exports = function transform(path) {
    if (markoUtils.isDynamicTag(path)) return
    const nodeName = path.get('name.value').node

    if (nodeName === 'style') return removeInline(path, 'css')
    if (nodeName === 'script' && removeInline(path, 'js')) return

    const removePath = isRemovable(path)
    const outputType = path.hub.file.markoOpts.output

    path.get('attributes').forEach((attr) => {
        const attrName = attr.get('name').node

        if (attrName !== 'src' && ASSET_TAGS[nodeName] !== attrName) return
        const { confident, value } = attr.get('value').evaluate()
        if (!confident || !value || !isAssetPath(value)) return
        if (removePath && outputType === 'html') return path.remove()

        const nameHint = nodeName === 'script' ? undefined : 'asset'
        const asset = markoUtils.importDefault(path.hub.file, value, nameHint)

        return removePath ? path.remove() : attr.set('value', asset)
    })
}

function removeInline(nodePath, nodeType) {
    const nodeBody = nodePath.get('body').node.body
    const outputType = nodePath.hub.file.markoOpts.output

    if (nodeBody.length !== 1) return false
    if (nodeBody[0].type !== 'MarkoText') return false

    if (outputType !== 'html') {
        const fileName = getAttrByName(nodePath, 'id') ?? 'inline'
        const fileType = getAttrByName(nodePath, 'class') ?? nodeType

        nodePath.hub.file.metadata.marko.deps.push({
            code: nodePath.get('body.body.0.value').node,
            virtualPath: `${fileName}.${fileType}`,
        })
    }

    nodePath.remove()
    return true
}

function getAttrByName(nodePath, attrName) {
    const attrNode = nodePath
        .get('attributes')
        .find((attr) => attr.get('name').node === attrName)

    if (attrNode) {
        const { confident, value } = attrNode.get('value').evaluate()
        if (confident && value && !value.includes(' ')) return value
    }

    return undefined
}

function isRemovable(nodePath) {
    const nodeName = nodePath.get('name.value').node

    if (nodeName === 'script') return true
    if (nodeName !== 'link') return false

    return nodePath.get('attributes').some((attr) => {
        const attrName = attr.get('name').node
        if (attrName !== 'rel' && attrName !== 'href') return false

        const attrValue = attr.get('value').evaluate().value
        if (attrName === 'rel') return attrValue === 'stylesheet'

        return CSS_FILTER.test(attrValue)
    })
}

function isAssetPath(attrValue) {
    if (typeof attrValue !== 'string') return false

    if (attrValue[0] === '/') return false // Ignore absolute paths for the moment.
    if (!attrValue.startsWith('./')) return false // Ignore non relative paths also.

    if (!/\.[^.]+$/.test(attrValue)) return false // Ignore paths without extension.
    if (/^[a-z]{2,}:/i.test(attrValue)) return false // Ignore paths with a protocol.

    return true
}

'use strict'

const createHash = require('crypto').createHash
const resolvePath = require('path').resolve
const markoUtils = require('@marko/babel-utils')

const ASSET_TAGS = {
    link: 'href',
    object: 'data',
    video: 'poster',
    body: 'background',
}

module.exports = function transform(path, type) {
    if (markoUtils.isDynamicTag(path)) return

    const tagAttr = findAttrByName(path, 'rollup')
    const tagType = getAttrValue(tagAttr)

    if (tagType === 'ignore') return tagAttr.remove()

    const nodeName = path.node.name.value
    const nodeBody = path.node.body.body

    if (['style', 'script'].includes(nodeName) && nodeBody.length === 1) {
        return type.isMarkoText(nodeBody[0]) && translate(path)
    }

    let source = findAttrByName(path, ASSET_TAGS[nodeName])
    if (!source) source = findAttrByName(path, 'src')

    const href = source ? getAttrValue(source) : undefined
    if (tagType !== 'bundle' && !isValidAssetPath(href)) return

    const isStyles = getAttrValue(path, 'rel') === 'stylesheet'
    if (nodeName === 'link' && isStyles) return translate(path, href)

    if (['style', 'script'].includes(nodeName)) return translate(path, href)
    source.set('value', markoUtils.importDefault(path.hub.file, href, 'asset'))
}

function translate(path, href) {
    let fileName = getAttrValue(path, 'name') ?? getAttrValue(path, 'id')
    let fileType = getAttrValue(path, 'type') ?? getAttrValue(path, 'class')

    const isScript = path.node.name.value === 'script'

    if (href) {
        const lastSepIdx = href.lastIndexOf('/') + 1
        const lastDotIdx = href.lastIndexOf('.')

        if (!fileName) fileName = href.slice(lastSepIdx, lastDotIdx)
        if (!fileType) fileType = href.slice(lastDotIdx + 1)

        if (process.env.VITE_ENV) {
            href = resolvePath(path.hub.file.metadata.marko.id, '..', href)
        }

        path.hub.file.metadata.marko.deps.push({
            code: `${isScript ? '' : '@'}import "${href}";`,
            virtualPath: `./virtual-${fileName}.${fileType}`,
        })
    } else {
        const code = path.node.body.body[0].value
        const hash = createHash('sha1').update(code).digest('hex')

        if (!fileName) fileName = 'inlined-' + hash.slice(0, 8)
        if (!fileType) fileType = isScript ? 'js' : 'css'

        const file = `./${fileName}.${fileType}`
        path.hub.file.metadata.marko.deps.push({ code, virtualPath: file })
    }

    return path.remove()
}

function findAttrByName(path, name) {
    if (name === undefined) return undefined
    return path.get('attributes').find((attr) => attr.node.name === name)
}

function getAttrValue(attr, name) {
    if (name) attr = findAttrByName(attr, name)
    if (attr === undefined) return undefined

    const { confident, value } = attr.get('value').evaluate()
    return confident && value ? ('' + value).trim() : undefined
}

function isValidAssetPath(href) {
    if (typeof href !== 'string') return false

    if (href[0] === '/') return false // Ignore absolute paths for the moment.
    if (!/^\.\.?\//.test(href)) return false // Ignore non relative paths also.

    if (/^[a-z]{2,}:/i.test(href)) return false // Ignore paths with a protocol.
    if (!/\.[a-z]+$/i.test(href)) return false // Ignore paths without extension.

    return true
}

'use strict'

const { basename, extname, resolve } = require('path')

const markoUtils = require('@marko/babel-utils')
const markoTypes = require('@marko/compiler').types

const ASSET_TAGS = {
    link: 'href',
    object: 'data',
    video: 'poster',
    body: 'background',
}

module.exports = {
    MarkoTag(path) {
        transform(path)
    },
}

function transform(path) {
    if (markoUtils.isDynamicTag(path)) return

    const nodeName = path.node.name.value
    const nodeBody = path.node.body.body

    const tagAttr = findAttrByName(path, 'rollup')
    const tagType = getAttrValue(tagAttr)

    if (['rollup', 'style'].includes(nodeName)) {
        path.hub.file.path.node.extra.___featureType = 'class'
    }

    if (tagType === 'ignore') return tagAttr.remove()

    if (['style', 'script'].includes(nodeName) && nodeBody.length === 1) {
        return markoTypes.isMarkoText(nodeBody[0]) && translate(path)
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
    const scopedAttr = findAttrByName(path, 'scoped')
    const parentPath = markoUtils.findParentTag(path)

    const isScript = path.node.name.value === 'script'

    let fileName = getAttrValue(path, 'name') ?? getAttrValue(path, 'id')
    let fileType = getAttrValue(path, 'lang') ?? getAttrValue(path, 'class')

    let code = path.node.body.body[0]?.value

    if (href) {
        code = `${isScript ? '' : '@'}import "${href}";`

        if (!isScript && !scopedAttr && !fileName && !fileType) {
            markoUtils.importDefault(path.hub.file, href)
            return path.remove()
        }

        if (process.env.VITE_ENV) {
            href = resolve(path.hub.file.metadata.marko.id, '..', href)
        }

        if (!fileType) fileType = isScript ? 'js' : extname(href).slice(1)
    } else if (!fileType) fileType = isScript ? 'js' : 'css'

    if (['css', 'less'].includes(fileType) && scopedAttr && parentPath) {
        const scope = translateScoped(path, scopedAttr, parentPath)

        code = `.${scope} {${href ? `@import (less) "${href}";` : code}}`
        fileType = 'less'
    }

    fileName = `./${fileName ?? getUniqueTagId(path)}.${fileType}`
    path.hub.file.metadata.marko.deps.push({ code, virtualPath: fileName })

    return path.remove()
}

function translateScoped(path, scopedAttr, parentPath) {
    const scope = getAttrValue(scopedAttr) ?? getUniqueTagId(path)

    let classAttr = findAttrByName(parentPath, 'class')
    let attrValue = getAttrValue(classAttr)

    attrValue = attrValue ? `${attrValue} ${scope}` : scope
    attrValue = markoTypes.stringLiteral(attrValue)

    if (!classAttr) {
        classAttr = markoTypes.markoAttribute('class', attrValue)
        parentPath.node.attributes.push(classAttr)
    } else classAttr.set('value', attrValue)

    return scope
}

function findAttrByName(path, name) {
    if (name === undefined) return undefined
    return path.get('attributes').find((attr) => attr.node.name === name)
}

function getAttrValue(attr, name) {
    if (name) attr = findAttrByName(attr, name)
    if (attr === undefined) return undefined

    const { confident, value } = attr.get('value').evaluate()
    const strValue = confident ? `${value}`.trim() : undefined

    return ['', 'true'].includes(strValue) ? undefined : strValue
}

function isValidAssetPath(href) {
    if (typeof href !== 'string') return false

    if (href[0] === '/') return false // Ignore absolute paths for the moment.
    if (!/^\.\.?\//.test(href)) return false // Ignore non relative paths also.

    if (/^[a-z]{2,}:/i.test(href)) return false // Ignore paths with a protocol.
    if (!/\.[a-z]+$/i.test(href)) return false // Ignore paths without extension.

    return true
}

function getUniqueTagId(path) {
    let name = path.hub.file.metadata.marko.id
    if (name.endsWith('/index.marko')) name = name.slice(0, -12)

    name = 'g_' + basename(name, '.marko')
    name += '-L' + path.node.loc.start.line

    return name
}

'use strict'

const path = require('path')
module.exports = function transform (el, context) {
  if (el.hasAttribute('src') && el.getAttributeValue('src').type === 'Literal') {
    let assetPath = el.getAttributeValue('src').value

    if (assetPath.startsWith('.')) {
      assetPath = path.resolve(path.dirname(context.filename), assetPath)
      el.setAttributeValue('src', context.builder.literal(assetPath))

      let assetCode = 'import assetPath from \'' + assetPath + '\'; '
      assetCode += 'assets.push([\'' + assetPath + '\', assetPath]);'

      context.addDependency({
        type: 'asset',
        code: assetCode,
        virtualPath: assetPath + '|assets',
        path: './' + path.basename(context.filename)
      })
    }
  }
}

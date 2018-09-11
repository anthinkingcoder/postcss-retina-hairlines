const postcss = require('postcss');
var assign = require('object-assign');

var defaults = {
  blackList: [],
  base64: false
}

module.exports = postcss.plugin('postcss-retina-hairlines', function (opts) {
  opts = assign({}, defaults, opts)
  return function (root) {
    root.walkDecls(/^border/, function (decl) {
      if (!isBlackList(opts.blackList, decl.parent.selector) && isHairline(decl.value)) {
        var color = getBorderColor(decl.value)
        var rule = decl.parent
        decl.value = decl.value.replace(color, 'transparent')
        rule.insertAfter(decl, decl.clone({prop: 'border-image', value: generateHairlineSvg(color, opts.base64)}))
      }
    })
  }
})


function isHairline(value) {
  return !!~value.indexOf('1px')
}

function isBlackList(blacklist, selector) {
  return blacklist.some(function (regex) {
    if (typeof regex === 'string') {
      return !!~selector.indexOf(regex)
    }
    return selector.match(regex)
  })
}

function getBorderColor(value) {
  value = value.replace(/\s+/ig, ' ')
  return value.split(' ')[2]
}


function generateHairlineSvg(color, isBase64) {
  var svg = `<svg xmlns='http://www.w3.org/2000/svg' height='2px'><rect fill="${color}" width='100%' height='50%'> </rect> </svg>`
  return `url("data:image/svg+xml;${!isBase64 ? `charset=utf-8,${encodeUTF8(svg)}` : `base64,${new Buffer(svg).toString('base64')}`}")  0 0 2 0 stretch`
}

var encodeUTF8 = function (string) {
  return encodeURIComponent(
      string
      // collapse whitespace
          .replace(/[\n\r\s\t]+/g, ' ')
          // remove comments
          .replace(/<\!--([\W\w]*(?=-->))-->/g, '')
          // pre-encode ampersands
          .replace(/&/g, '%26')
  )
  // escape commas
      .replace(/'/g, '\\\'')
      // un-encode compatible characters
      .replace(/%20/g, ' ')
      .replace(/%22/g, '\'')
      .replace(/%2F/g, '/')
      .replace(/%3A/g, ':')
      .replace(/%3D/g, '=')
      // encode additional incompatible characters
      .replace(/\(/g, '%28')
      .replace(/\)/g, '%29');
}


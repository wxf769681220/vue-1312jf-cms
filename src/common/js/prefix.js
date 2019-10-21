const prefixes = ['-webkit-', '-moz-', '-ms-']
const camelPrefixes = ['Webkit', 'Moz', 'ms']

/**
 * 给html元素style属性特添加浏览器前缀
 * @param {*} prop 
 */
function prefix(prop) {
  //将驼峰式属性转换成短横分割式（-）
  prop = hyphenate(prop)

  //将短横分割式属性转换成驼峰式
  var camel = camelize(prop)
  var upper = camel.charAt(0).toUpperCase() + camel.slice(1)

  if (!testEl) {
    testEl = document.createElement('div')
  }

  var i = prefixes.length
  var prefixed

  if (camel !== 'filter' && (camel in testEl.style)) {
    return {
      kebab: prop,
      camel: camel
    }
  }

  while (i--) {
    prefixed = camelPrefixes[i] + upper
    if (prefixed in testEl.style) {
      return {
        kebab: prefixes[i] + prop,
        camel: prefixed
      }
    }
  }
}
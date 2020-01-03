/**
 * 将数组按照一个基数进行分组
 * @param { Array } array '数组'
 * @param { Number } subGroupLength '分组基数'
 */
export function arraySubGroup(array, groupNum) {
  let index = 0
  let arr = []
  while (index < array.length) {
    arr.push(array.slice(index, index += groupNum))
  }
  return arr
}

/**
 * 将数组去掉重复项
 * @param { Array } array '数组'
 */
export function arrayFilterDuplicate(array) {
  let arr = []
  array.forEach((item) => {
    if (arr.indexOf(item) === -1) {
      arr.push(item)
    }
  })
  return arr
}

/**
 * 将数组按照特定某一属性排序
 * @param { String } propertyName '属性名'
 */
export function arrayCompare(propertyName) {
  return function (obj1, obj2) {
    var value1 = obj1[propertyName]
    var value2 = obj2[propertyName]
    if (value1 > value2) {
      return 1
    } else if (value1 < value2) {
      return -1
    } else {
      return 0
    }
  }
}

// 事件延迟
export function debounce(func, delay) {
  let timer
  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

// 锁屏
export function screenLock(isLock, el) {
  // 锁屏
  if (isLock) {
    el.style.height = '100vh'
    el.style.overflow = 'hidden'
  } else {
    el.style.height = 'auto'
    el.style.overflow = 'auto'
  }
}

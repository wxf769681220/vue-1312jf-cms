export function getMatchTypeString(num) {
  if (typeof num !== 'number') {
    return
  }
  let type
  switch (num) {
    case 0:
      type = '单人赛'
      break
    case 1:
      type = '团体赛'
      break
    case 2:
      type = '双人赛'
      break
    default:
      console.log('error：', num)
  }
  return type
}

export function matchStatusChange(status) {
  if (typeof status !== 'number') {
    return
  }
  let str
  switch (status) {
    case 0:
      str = '正在报名中...'
      break
    case 1:
      str = '报名名单导入完成...'
      break
    case 2:
      str = '比赛开始...'
      break
    case 3:
      str = '成绩录入中..'
      break
    case 4:
      str = '比赛已结束...'
      break
    case 5:
      str = '开始签到...'
      break
    default:
      console.log('error：' + status)
  }
  return str
}

export function btnTypeChange(status) {
  if (typeof status !== 'number') {
    return
  }
  let obj = {
    type: '',
    btnText: ''
  }
  switch (true) {
    case status === 0 || status === 1 || status === 5:
      obj.type = 'primary'
      obj.btnText = '进入报名'
      break
    case status === 2 || status === 3:
      obj.type = 'success'
      obj.btnText = '进入比赛'
      break
    case status === 4:
      obj.type = 'error'
      obj.btnText = '比赛结束'
      break
    default:
      console.log('error：', status)
  }
  return obj
}

export function fontSizeChange(str) {
  if (typeof str !== 'string') {
    return
  }
  let size
  switch (str) {
    case 'small':
      size = '12px'
      break
    case 'default':
      size = '14px'
      break
    case 'large':
      size = '16px'
      break
    default:
      console.log('error：', str)
  }
  return size
}

export function orderRuleChange(arr) {
  if (!Array.isArray(arr)) {
    return
  }
  let newArr = []
  arr.forEach((item, index) => {
    switch (item) {
      case '总积分':
        arr[index] = 'score'
        newArr[0] = arr[index]
        break
      case '胜轮数':
        arr[index] = 'winRound'
        newArr[1] = arr[index]
        break
      case '级差分':
        arr[index] = 'smallScore'
        newArr[2] = arr[index]
        break
      case '升级数':
        arr[index] = 'upLevels'
        newArr[3] = arr[index]
        break
      case '去首累进分':
        arr[index] = 'progressive'
        newArr[4] = arr[index]
        break
      case '累进分':
        arr[index] = 'leijinScore'
        newArr[5] = arr[index]
        break
      case '对手分':
        arr[index] = 'lastAllMeetScore'
        newArr[6] = arr[index]
        break
      default:
        console.log('error：', arr)
    }
  })
  let result = newArr.filter((item) => {
    return (item !== 'undefined')
  })
  return result
}

export function getCurrentRoundTitle(content) {
  if (typeof content !== 'string') {
    return
  }
  let title
  switch (content) {
    case 'tables':
      title = '本轮桌次'
      break
    case 'recordTable':
      title = '比赛记录表'
      break
    case 'scoreEntering':
      title = '成绩录入'
      break
    case 'score':
      title = '本轮成绩'
      break
    default:
      console.log('error：', content)
  }
  return title
}

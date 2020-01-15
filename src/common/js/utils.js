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

export function chairChange(chairIndex) {
  if (typeof chairIndex !== 'number') {
    return
  }
  let str = ''
  switch (chairIndex) {
    case 0:
      str = '东'
      break
    case 1:
      str = '南'
      break
    case 2:
      str = '西'
      break
    case 3:
      str = '北'
      break
    default:
      console.log('error：', chairIndex)
  }
  return str
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

export function getPlayerStatus(val) {
  if (typeof val !== 'number') {
    return
  }
  let str
  switch (val) {
    case 0:
      str = '正常'
      break
    case 1:
      str = '判负'
      break
    case 2:
      str = '弃赛'
      break
    case 3:
      str = '犯规'
      break
    case 4:
      str = '轮空'
      break
    case 5:
      str = '违例'
      break
    case 6:
      str = '取消资格'
      break
    case 7:
      str = '警告'
      break
    case 8:
      str = '正常'
      break
    default:
      console.log('error：选手其他状态!')
  }
  return str
}

export function getVerifyStatus(val) {
  if (typeof val !== 'number') {
    return
  }
  let str
  switch (val) {
    case 0:
      str = '通过'
      break
    case 1:
      str = '未审核'
      break
    case 2:
      str = '拒绝'
      break
    default:
      console.log('error：', val)
  }
  return str
}

// 成绩转换从0-13 对应 2-A+
export function getPlayerScore(val) {
  // console.log(typeof val)
  if (typeof val !== 'number') {
    return
  }
  let score = ''
  switch (true) {
    case (0 <= val) && (val <= 8):
      score = val + 2
      break
    case val === 9:
      score = 'J'
      break
    case val === 10:
      score = 'Q'
      break
    case val === 11:
      score = 'K'
      break
    case val === 12:
      score = 'A'
      break
    case val === 13:
      score = 'A+'
      break
    default:
      console.log('error：', val)
  }
  return score
}

// 成绩转换11-15 对应 JQKAA+
export function getPlayerScore2(val) {
  // console.log(typeof val)
  if (typeof val !== 'number') {
    return
  }
  let score = ''
  switch (true) {
    case (0 < val) && (val <= 10):
      score = val
      break
    case val === 11:
      score = 'J'
      break
    case val === 12:
      score = 'Q'
      break
    case val === 13:
      score = 'K'
      break
    case val === 14:
      score = 'A'
      break
    case val === 15:
      score = 'A+'
      break
    default:
      console.log('error：', val)
  }
  return score
}

// 根据座位匹配选手号
export function getEnrollNumByChair(data, chairIndex) {
  if (typeof chairIndex !== 'number') {
    return
  }
  let enrollNum = ''
  data.forEach(item => {
    if (item.chairIndex === chairIndex) {
      enrollNum = item.enrollNum
    }
  })
  return enrollNum
}

// 根据选手号匹配选手姓名（realName）
export function getNameByEnrollNum(playerInfo, enrollNum) {
  if (typeof enrollNum !== 'number') {
    return
  }
  let name = ''
  playerInfo.forEach(item => {
    if (item.enrollNum === enrollNum) {
      name = item.realName
    }
  })
  return name
}

// 获取选手去首累进分
export function getQSLJScore(data) {
  if (!Array.isArray(data)) {
    return
  }
  let arr = []
  data.forEach(item => {
    arr.push(item.score)
  })
  // 计算每轮去首累进分
  let QSLJScore = []
  arr.forEach((item, index) => {
    // console.log(item)
    let newArr = arr.slice(0, index + 1)
    // 去首累进分首项为0
    newArr[0] = 0
    let el = newArr.reduce(function (prev, cur) {
      return prev + cur
    })
    QSLJScore.push(el)
  })
  // 计算去首累进分总分
  let totalScore = QSLJScore.reduce(function (prev, cur) {
    return prev + cur
  })
  // 返回一个对象
  return {
    map: QSLJScore,
    total: totalScore
  }
}

// 获取选手级差分总和
export function getJCScore(data) {
  if (!Array.isArray(data)) {
    return
  }
  let totalScore = 0
  data.forEach(item => {
    totalScore += item.smallScore
  })
  return totalScore
}

// 获取选手胜轮次总和
export function getSLCScore(data) {
  if (!Array.isArray(data)) {
    return
  }
  let totalScore = 0
  data.forEach(item => {
    if (item.score === 2) {
      totalScore += 1
    }
  })
  return totalScore
}

// 获取选手升级数总和
export function getSJSScore(data) {
  if (!Array.isArray(data)) {
    return
  }
  let totalScore = 0
  data.forEach(item => {
    totalScore += item.upLevels
  })
  return totalScore
}

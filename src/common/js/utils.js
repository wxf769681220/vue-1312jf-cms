export function getMatchTypeString(num) {
  let type = ''
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
      console.log('error：' + num)
  }
  return type
}

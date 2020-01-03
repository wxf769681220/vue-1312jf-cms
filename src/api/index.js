import BaseUrl from './config'
import { post, get } from './axios'

// 登录
const Login = post(BaseUrl + '/admin/login')

// 创建比赛
const createMatch = post(BaseUrl + '/match')

// 1.获取所有比赛
// 2.获取某一场比赛 + /matchId
const getMatch = get(BaseUrl + '/match')

// 1.报名表信息写入数据库 2 新增数据 + /matchId
const readInEnrollInfo = post(BaseUrl + '/users')

// 获取已经写入数据库的报名表信息 + /matchId
const getEnrollInfo = get(BaseUrl + '/users')

// 获取手机端报名表信息
const getEnrollInfoFromMobile = get(BaseUrl + '/match/verifyList')

// 验证选手审核状态
const verifyPlayerStatus = post(BaseUrl + '/match/verify')

// 删除报名表信息
const deleteEnrollInfo = post(BaseUrl + '/users/delete')

// 修改报名表信息 + usersId
const modifyEnrollInfo = post(BaseUrl + '/users/modify')

// 签到 + matchId
const signIn = post(BaseUrl + '/match/signIn')

// 开始签到（现场）
const signStart = post(BaseUrl + '/match/startSign')

// 报名表中(已签到)选手号随机分配 + /matchId
const randomEnrollNum = get(BaseUrl + '/match/chouqian')

// 设置比赛规则 + /matchId
const setMatchRules = post(BaseUrl + '/match/addRules')

// 比赛开始 + /matchId
const matchStart = post(BaseUrl + '/match/start')

// 获取比赛座位 + /matchId + /currentRound
const getCurrentRoundTables = get(BaseUrl + '/round/seat')

// 换座
const setSeat = post(BaseUrl + '/round/changeSeat')

// 当前轮某一桌所有选手成绩录入 + /matchId + /rounId
const setScore = post(BaseUrl + '/round/changeScore')

// 获取当前轮所有选手成绩 + matchId + /currentRound
const getScore = get(BaseUrl + '/round/score')

// 发布当前轮成绩 + matchId + /currentRound
const postScore = post(BaseUrl + '/round/postScore')

// 开始下一轮 + matchId
const nextRoundStart = post(BaseUrl + '/match/start')

// 积分编排选手信息 + matchId
const jfCard = get(BaseUrl + '/match/bianpai')

// 成绩公告 + matchId
const scoreReport = get(BaseUrl + '/match/scoreReport')

// 奖励签收表
const getSignatureInfo = post(BaseUrl + '/mobile/match/scoreReport')

export {
  Login,
  createMatch,
  getMatch,
  readInEnrollInfo,
  getEnrollInfo,
  getEnrollInfoFromMobile,
  deleteEnrollInfo,
  modifyEnrollInfo,
  verifyPlayerStatus,
  signIn,
  randomEnrollNum,
  setMatchRules,
  matchStart,
  signStart,
  getCurrentRoundTables,
  setSeat,
  setScore,
  getScore,
  postScore,
  nextRoundStart,
  jfCard,
  scoreReport,
  getSignatureInfo
}

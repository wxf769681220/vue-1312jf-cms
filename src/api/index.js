import BaseUrl from './config'
import { post, get } from './axios'

const Login = post(BaseUrl + '/admin/login') // 登录
const createMatch = post(BaseUrl + '/match') // 创建比赛
const getMatch = get(BaseUrl + '/match') // 获取所有比赛
const readInEnrollInfo = post(BaseUrl + '/users') // 1.报名表信息写入数据库 2 新增数据 + /matchId
const getEnrollInfo = get(BaseUrl + '/users') // 获取已经写入数据库的报名表信息 + /matchId
const deleteEnrollInfo = get(BaseUrl + '/users/delete') // 删除报名表信息
const modifyEnrollInfo = post(BaseUrl + '/users/modify') // 修改报名表信息 + usersId

export {
  Login,
  createMatch,
  getMatch,
  readInEnrollInfo,
  getEnrollInfo,
  deleteEnrollInfo,
  modifyEnrollInfo
}

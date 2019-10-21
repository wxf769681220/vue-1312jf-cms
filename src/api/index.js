import BaseUrl from './config'
import { post, get } from 'common/js/axios'

// 登录
const Login = post(BaseUrl + '/admin/login')

// 获取所有比赛
const getMatch = get(BaseUrl + '/match')

export { Login, getMatch }

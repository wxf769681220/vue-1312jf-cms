import axios from 'axios'
import store from '@/store'

/*
 * 全局配置
 * 请求超时（10s）
 * POST请求头
**/
axios.defaults.timeout = 10000
axios.defaults.headers.post['Content-Type'] = 'application/json; charset=UTF-8'

/*
 * 请求拦截器
 * 每次发送请求之前判断vuex中是否存在token
 * 如果存在,则统一在http请求的header都加上token
 * 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
 *
**/
axios.interceptors.request.use(config => {
  const AUTH_TOKEN = store.state.token
  AUTH_TOKEN && (config.headers.Authorization = AUTH_TOKEN)
  return config
}, error => {
  return Promise.reject(error)
})

/*
 * 响应拦截器
 * 根据返回的状态码进行错误的统一处理
 *
**/
axios.interceptors.response.use(response => {
  // 如果返回的状态码为200, 说明接口请求成功，可以正常拿到数据
  // 否则抛出错误
  if (response.status === 200) {
    return Promise.resolve(response)
  } else {
    return Promise.reject(response)
  }
}, error => {
  if (error.response.status) {
    switch (error.response.status) {
      case 401: // 未登录
        // ...
        break
      case 403: // token过期失效
        // ...
        break
      case 404: // 请求不存在
        // ...
        break
      default:
      // ...
    }
  }
  return Promise.reject(error.response)
})

// GET
export function get(url) {
  return function (dynamic, params) {
    return axios.get(url + dynamic, {
      params
    }).then(res => {
      const { status, data } = res
      if (status === 200) {
        return data
      }
    }).catch((error) => {
      console.log(error)
    })
  }
}

// POST
export function post(url) {
  return function (dynamic, params) {
    return axios.post(url + dynamic, params).then(res => {
      const { status, data } = res
      if (status === 200) {
        return data
      }
    }).catch((error) => {
      console.log(error)
    })
  }
}

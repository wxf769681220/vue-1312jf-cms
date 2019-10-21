import axios from 'axios'

// GET
export function get(url) {
  return function (params, token) {
    axios.defaults.headers.get['Authorization'] = token
    return axios.get(url, {
      params
    }).then((res) => {
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
  return function (params, token) {
    axios.defaults.headers.post['Authorization'] = token
    return axios.post(url, params).then((res) => {
      const { status, data } = res
      if (status === 200) {
        return data
      }
    }).catch((error) => {
      console.log(error)
    })
  }
}

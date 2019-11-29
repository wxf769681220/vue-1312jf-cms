const urlMap = {
  // development: 'http://47.96.233.166:7777',
  development: 'http://192.168.1.242:7777'
  // development: 'http://192.168.1.56:7777'
  // staging: '',
  // production: ''
}

const baseUrl = urlMap[process.env.NODE_ENV]

export default baseUrl

import axios from 'axios'
import { Toast } from 'vant'
import { getToken } from './auth'
// create an axios instance
const service = axios.create({
  baseURL: '/api', // api 的 base_url
  timeout: 10000 // request timeout
})
// http 500 响应码
const errorCode = [400, 401, 403, 404, 405, 500, 502, 503, 504]
// request interceptor
service.interceptors.request.use(
  config => {
    const token = getToken('access_token')
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + getToken('access_token')
    }
    return config
  },
  error => {
    // Do something with request error
    Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    var res = response.data;
    if (res.code === 1000 || res.code === 3000) {
      Toast.fail(res.msg)
      return Promise.reject(res.msg);
    } else if (res.code === 5000) {
      Toast.fail(res.msg)
      return Promise.reject(res.msg);
    } else if (res.code === 10000 || res.code === 10001) {
      Toast.fail(res.msg)
      return Promise.reject(res.msg);
    } else {
      return response.data;
    }
  },
  error => {
    const res = error.response
    if (errorCode.indexOf(res.status) !== -1) {
      Toast.fail('服务器发生错误，请稍后重试')
    }
    return Promise.reject(error)
  }
)

export default service
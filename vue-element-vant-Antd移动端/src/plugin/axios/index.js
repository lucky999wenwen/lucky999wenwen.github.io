/*
 * @Descripttion:
 * @version:
 * @Author: seven
 * @Date: 2019-09-03 19:21:19
 * @LastEditors: seven
 * @LastEditTime: 2020-11-10 19:44:29
 */
import axios from 'axios'
import { Message, MessageBox } from 'element-ui'

const service = axios.create({
  baseURL: process.env.VUE_APP_API,
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 10000 // request timeout
})
// request interceptor
service.interceptors.request.use(
  config => {
    // config.headers['Access-Control-Max-Age'] = 86400
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data
    if(res.code === 200 || res.code === 1){
      return response.data;
    }else{
      Message({
        showClose: true,
        message: res.msg || res.message || 'error',
        type: 'warning',
        duration: 5 * 1000
      })
      return Promise.reject(res.msg || 'error')
    }
  },
  error => {
    console.log(error,'访问异常的错误');
    Message({
      showClose: true,
      message: '访问异常',
      type: 'warning',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service

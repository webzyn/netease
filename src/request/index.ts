import axios from 'axios'

let baseURL = 'http://localhost:3000'

// 创建axios实例
const service = axios.create({
  // 根据定义的环境状态，切换不同的 baseURL 开发环境使用代理, 生产环境可以直接使用域名全拼
  // baseURL: process.env.NODE_ENV === "production" ? prodUrl : "",
  baseURL: baseURL,
  withCredentials: true,
  timeout: 60000
})

// 设置请求拦截
service.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error.response)
  }
)

// 设置响应拦截
service.interceptors.response.use(
  (response) => {
    // 将真实数据从 axios返回的数据中剥离出来
    return response.data
  },
  (error) => {
    return Promise.reject(error.response)
  }
)

export function post(url: string, data: any = {}) {
  return new Promise((resolve, reject) => {
    service
      .post(url + '?timestamp=' + new Date().getTime(), data)
      .then((res) => {
        resolve(res)
      })
      .catch((e) => {
        reject(e)
      })
  })
}

export function get(url: string, params: any = {}) {
  return new Promise((resolve, reject) => {
    service
      .get(url, {
        params: {
          ...params,
          timestamp: new Date().getTime()
        }
      })
      .then((res) => {
        resolve(res)
      })
      .catch((e) => {
        reject(e)
      })
  })
}

export default service

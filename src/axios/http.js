import axios from 'axios'

// 错误过滤
// eslint-disable-next-line
const responseHandler = response => {
  if (response.status === 200) {
    if (response.data.result === '0') {
      return response.data
    }
  }
  return response.data
}

const service = axios.create({
  timeout: 10000 // 10S超时
})

service.interceptors.request.use(
  config => {
    config.headers.Authorization =
      'eyJhbGciOiJIUzUxMiJ9.eyJwYXNzd29yZCI6ImhyMTIzNDU2Iiwicm9sZUlkcyI6IltcIkhSXCJdIiwiZGF0ZVVwZGF0ZSI6MTYxMjc3Nzk2NzAwMCwiaWQiOjEyLCJkYXRlQ3JlYXRlIjoxNjEyNzc3OTY3MDAwLCJ1c2VyTmFtZSI6InRlc3RfaHIiLCJ1c2VySWQiOiJzMnNiNnhnd2VDIn0.twvBTQm21DFlUKh5qCjAJEenewruX89NrRELColJOP8FWoiK1XxsYu1tfST1WL3hT6sHPSGseDbgo3Y9eHpjvA'
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// GET 请求
const get = async (url, params, config) => {
  const respone = await service.get(url, { params, ...config })
  return responseHandler(respone)
}

// POST 请求
const post = async (url, data, params, config) => {
  const respone = await service.post(url, data, { params, ...config })
  console.log(respone)
  return responseHandler(respone)
}

export default { get, post }

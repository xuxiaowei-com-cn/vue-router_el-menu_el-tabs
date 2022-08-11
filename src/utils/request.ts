import axios from 'axios'
import { useStore } from '../store'

// create an axios instance
const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API, // BASE URL
  withCredentials: true // 携带 Cookie
  // timeout: 5000 // 请求超时
})

// request interceptor
service.interceptors.request.use(config => {
  console.log('在 axios 请求中，读取缓存 isCollapse：', useStore.isCollapse)

  return config
},
error => {
  return error
}
)

// response interceptor
service.interceptors.response.use(response => {
  return response
},
error => {
  return error
}
)

export default service

import axios from 'axios'
const baseURL ="https://emcs.quanyou.com.cn"
const api = axios.create({
  baseURL, // 如果`url`不是绝对地址，那么`baseURL`将会加到`url`的前面
  timeout: 5000, // 超过请求时间停止请求
  withCredentials: true, // 是否跨域请求
  headers: {
    // 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    'Content-Type': 'application/json;charset=UTF-8'
  }
})
export default {
  api,
  baseURL
};

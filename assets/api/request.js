import axios from 'axios'
export const baseURL ="http://172.30.3.40:9086/mockjsdata/5"
const api = axios.create({
  baseURL,
  timeout: 5000,
  withCredentials: true,
  headers: {
    // 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    'Content-Type': 'application/json;charset=UTF-8'
  }
})
export default  api;

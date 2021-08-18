import axios from 'axios'
import {
  Loading,
  Message
} from 'element-ui';
import router from './router';

let loading;
// 加载动画
function startLoading() {
  loading = Loading.service({
    lock: true,
    text: 'Loading',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)'
  })
}
// 结束动画
function endLoading() {
  loading.close()
}
// 请求拦截器
axios.interceptors.request.use(config => {
  // 加载动画
  startLoading()
  // 将token存储到请求头里面
  if (localStorage.userToken) {
    config.headers.Authorization = localStorage.userToken
  }
  // console.log(config.headers.Authorization);
  return config
}, error => {
  return Promise.reject(error)
})
// 响应拦截器
axios.interceptors.response.use(response => {
  // 结束动画
  endLoading()
  return response
}, error => {
  // 错误提醒
  endLoading()
  Message.error(error.response.data)
  // 获取状态码
  const {
    status
  } = error.response
  if (status == 401) {
    Message.error('token失效，请重新登录！')
    // 清除token
    localStorage.removeItem('userToken')
    // 跳转到登录页面
    router.push('/login')
  }
  return Promise.reject(error)
})
export default axios
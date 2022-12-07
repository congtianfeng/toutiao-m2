import axios from 'axios'
import store from '@/store'
import router from '@/router'
const request = axios.create({
  baseURL: 'http://toutiao.itheima.net'
})
// 请求拦截器统一注入token
request.interceptors.request.use(config => {
  const { users } = store.state
  if (users && users.data.token) {
    config.headers.Authorization = `Bearer ${users.data.token}`
  }
  return config
}, err => Promise.reject(err)
)
// 相应拦截器脱掉一层data
request.interceptors.response.use(res => res.data, async err => {
  if (err.response && err.response.status === 401) {
    const { users } = store.state
    if (!users || !users.data.refresh_token) return router.push('/login')
    // 如果有refresh_token，则请求获取新的 token
    try {
      const res = await axios({
        method: 'PUT',
        url: '/v1_0/authorizations',
        headers: {
          Authorization: `Bearer ${users.data.refresh_token}`
        }
      })

      // 如果获取成功，则把新的 token 更新到容器中
      console.log('刷新 token  成功', res)
      store.commit('updateUsers', {
        token: res.data.data.token, // 最新获取的可用 token
        refresh_token: users.refresh_token // 还是原来的 refresh_token
      })

      // 把之前失败的用户请求继续发出去
      // config 是一个对象，其中包含本次失败请求相关的那些配置信息，例如 url、method 都有
      // return 把 request 的请求结果继续返回给发请求的具体位置
      return request(err.config)
    } catch (err2) {
      // 如果获取失败，直接跳转 登录页
      console.log('请求刷新 token 失败', err2)
      router.push('/login')
    }
  }
  return Promise.reject(err)
})
export default request

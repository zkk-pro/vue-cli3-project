import request from '@/utils/request'
import qs from 'qs'

// export function login(data) {
//   return request({
//     url: 'login',
//     method: 'post',
//     data
//   })
// }

module.exports = {
  // 登录
  login: params => request({ url: 'login', method: 'post', data: qs.stringify(params) }),
  // 登出
  logout: () => request({ url: 'logout', method: 'post' })
}

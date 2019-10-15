import request from '@/utils/request'

module.exports = {
  getScreenEarnList: params => request({url: 'v1/profit/list', method: 'get', params})
}
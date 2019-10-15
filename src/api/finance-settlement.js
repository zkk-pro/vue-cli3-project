import request from '@/utils/request'

module.exports = {
  // 获取结算列表
  getSettlementList: params => request({url: 'v1/drawMoney/list', method: 'get', params})
}
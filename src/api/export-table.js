// 所有导出表格的请求接口

import request from '@/utils/request-blob'

module.exports = {
  // 车主审核-导出车主数据
  exportCarOwnerData: params => request({url: 'exportCarInfo/file', method: 'get', params}),
  // 收益结算-导出结算记录数据
  exportSettlementData: params => request({url: 'v1/drawMoney/file', method: 'get', params}),
  // 屏幕收益-导出车主信息数据
  exportScreenEarningData: params => request({url: 'v1/profit/file', method: 'get', params}),

}
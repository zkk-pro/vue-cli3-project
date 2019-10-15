import request from '@/utils/request'

module.exports = {
  // 获取车辆审核列表
  getCarList: params => request({url: 'CarList', method: 'get', params}),
  // 审核通过/不通过操作
  carAudit: params => request({url: 'car/audit', method: 'put', params}),
  
}
// 所有导出表格的请求接口

import request from "@/utils/request-blob";

// 车主审核-导出车主数据
export function exportCarOwnerData(params) {
  return request({ url: "exportCarInfo/file", method: "get", params });
}
// 收益结算-导出结算记录数据
export function exportSettlementData(params) {
  return request({ url: "v1/drawMoney/file", method: "get", params });
}
// 屏幕收益-导出车主信息数据
export function exportScreenEarningData(params) {
  return request({ url: "v1/profit/file", method: "get", params });
}

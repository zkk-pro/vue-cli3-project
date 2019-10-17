import request from "@/utils/request";

// 获取车辆审核列表
export function getCarList(params) {
  return request({ url: "CarList", method: "get", params });
}
// 审核通过/不通过操作
export function carAudit(params) {
  return request({ url: "car/audit", method: "put", params });
}

import request from "@/utils/request";

// 获取结算列表
export function getSettlementList(params) {
  return request({ url: "v1/drawMoney/list", method: "get", params });
}

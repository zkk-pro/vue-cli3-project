import request from "@/utils/request";

// 获取屏幕收益列表
export function getScreenEarnList(params) {
  return request({ url: "v1/profit/list", method: "get", params });
}

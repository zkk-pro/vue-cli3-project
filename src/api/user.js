import request from "@/utils/request";
import qs from "qs";

// 登录
export function login(params) {
  return request({ url: "login", method: "post", data: qs.stringify(params) });
}
// 登出
export function logout() {
  return request({ url: "logout", method: "post" });
}

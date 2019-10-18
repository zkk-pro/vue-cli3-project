/**
 * 针对二进制的数据封装的请求，如：导出表格返回的为二进制数据，没有code
 */

import axios from "axios";
import { MessageBox, Message } from "element-ui";
import store from "@/store";
import { getToken } from "@/utils/auth";

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  timeout: 1000 * 30, // request timeout 30s
  responseType: "blob"
});

// request interceptor
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers["token"] = getToken();
    }
    return config;
  },
  error => {
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  response => {
    let res = response.data;
    if (response.status === 200) {
      // 如果是json格式
      if (res.type === "application/json") {
        return new Promise((resolve, reject) => {
          // 把blob转为json
          const reader = new FileReader();
          reader.onload = e => {
            res = JSON.parse(e.target.result);
            if (res.code && res.code === 2000) {
              Message({
                message: res.msg || "请求错误",
                type: "error",
                duration: 5 * 1000
              });
              reject(new Error(res.msg || "Error"))
            } else if (res.code && res.code === 3000) {
              MessageBox.confirm(
                "登陆已过期，点击取消停留在本页面或点击重新登录",
                "确认登出",
                {
                  confirmButtonText: "重新登录",
                  cancelButtonText: "取消",
                  type: "warning"
                }
              ).then(() => {
                store.dispatch("user/resetToken").then(() => {
                  location.reload();
                });
              });
              reject(new Error(res.msg || "Error"))
            }
          };
          reader.readAsText(response.data);
        })
      } else {
        return res;
      }
    } else {
      Message({
        message: response.data.msg || "请求错误",
        type: "error",
        duration: 5 * 1000
      });
    }
  },
  error => {
    console.log("err" + error); // for debug
    Message({
      message: error.message,
      type: "error",
      duration: 5 * 1000
    });
    return Promise.reject(error);
  }
);

export default service;

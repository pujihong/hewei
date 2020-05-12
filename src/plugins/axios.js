"use strict";

import axios from "axios";
import qs from "qs";
import { baseUrl } from "@/apis";
import { Message } from "element-ui";
import router from "@/router/index";

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || "";
// axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
// axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

let config = {
  // baseURL: process.env.baseURL || process.env.apiUrl || ""
  timeout: 60 * 1000, // Timeout
  withCredentials: true, // Check cross-site Access-Control
  baseURL: baseUrl
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    const token = sessionStorage.getItem("token");
    if (config.method === "post" || config.method === "put") {
      config.data = qs.stringify(config.data);
    }
    // 让每个请求携带token
    if (token) {
      config.headers["authorization"] = token;
    }
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
_axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    let data;
    if (response.data === undefined) {
      data = JSON.parse(response.request.responseText);
    } else {
      data = response.data;
    }
    return data;
  },
  function(error) {
    // Do something with response error
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          error.message = "错误请求";
          break;
        case 401:
          error.message = "未授权，请重新登录";
          break;
        case 403:
          error.message = "拒绝访问";
          break;
        case 404:
          error.message = "请求错误,未找到资源";
          break;
        case 405:
          error.message = "请求方法未允许";
          break;
        case 408:
          error.message = "请求超时";
          break;
        case 500:
          error.message = "服务器端出错";
          break;
        case 501:
          error.message = "网络未实现";
          break;
        case 502:
          error.message = "网络错误";
          break;
        case 503:
          error.message = "服务不可用";
          break;
        case 504:
          error.message = "网络超时";
          break;
        case 505:
          error.message = "http版本不支持该请求";
          break;
        default:
          error.message = `未知错误${error.response.status}`;
      }
    } else {
      error.message = "连接服务器失败";
    }
    Message.error(error.message);
    sessionStorage.removeItem("token");
    router.push("/login");
    // return Promise.reject(error);
  }
);

/*
 *  get请求
 *  url:请求地址
 *  params:参数
 * */
export function get(url, params) {
  return new Promise((resolve, reject) => {
    _axios({
      url: baseUrl + url,
      method: "get",
      params: params
    })
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        Message.error(error.message);
        reject(error);
      });
  });
}

/*
 *  post请求
 *  url:请求地址
 *  params:参数
 * */
export function post(url, params) {
  return new Promise((resolve, reject) => {
    _axios({
      url: baseUrl + url,
      method: "post",
      data: params
    })
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        Message.error(error.message);
        reject(error);
      });
  });
}

/*
 *  文件上传
 *  url:请求地址
 *  params:参数
 * */
export function fileUpload(url, params) {
  return new Promise((resolve, reject) => {
    _axios({
      url: url,
      method: "post",
      data: params,
      headers: { "Content-Type": "multipart/form-data" }
    })
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        Message.error(error.message);
        reject(error);
      });
  });
}
export default {
  get,
  post,
  fileUpload
};

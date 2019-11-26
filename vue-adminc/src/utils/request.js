import axios from "axios";
import { Message } from "element-ui";

const BASEURL = process.env.NODE_ENV === "production" ? "" : "/devApi";
//创建axios赋给变量instance
const service = axios.create({
  baseURL: BASEURL,
  timeout: 10000
});

/**
 * 请求接口前，做一些数据处理（请求拦截器）
 */
service.interceptors.request.use(
  function(config) {
    // 在发送请求之前做些什么
    return config;
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

/**
 * 请求接口后，返回数据进行拦截（响应拦截器）
 */
service.interceptors.response.use(function(response) {
  let data = response.data;

  if (data.resCode !== 0) {
    Message.error(data.message);
    return Promise.reject(data);
  } else {
    return response;
  }
});

export default service;

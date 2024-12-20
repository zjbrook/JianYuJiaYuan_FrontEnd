import axios from "axios";

const request = axios.create({
  baseURL: "http://localhost:3000/",
  timeout: 1000, // 请求超时时间
});

// 添加请求拦截器
request.interceptors.request.use(
  (request) => {
    // 在发送请求之前做些什么
    return request;
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
request.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
    return response;
  },
  (error) => {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

export default request;

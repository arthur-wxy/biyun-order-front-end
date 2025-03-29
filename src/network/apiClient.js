import axios from 'axios';
import { message } from 'antd';
import { API_CONFIG } from './config';

const createApiClient = (config) => {
  const instance = axios.create({
    baseURL: config.BASE_URL,
    timeout: config.TIMEOUT,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: false, // 不需要跨域携带 cookies
  });

  // 请求拦截器
  instance.interceptors.request.use(
    (config) => {
      // 如果是文件上传，不设置 Content-Type
      if (config.data instanceof FormData) {
        delete config.headers['Content-Type'];
      } else {
        config.headers['Content-Type'] = 'application/json';
      }
      
      // 添加token等认证信息
      const token = localStorage.getItem('authToken');
      if (token) {
        config.headers.Authorization = `${token}`;
      }

      // 调试日志
      console.log('Request URL:', config.baseURL + config.url);
      console.log('Request Method:', config.method);
      console.log('Request Headers:', config.headers);
      
      return config;
    },
    (error) => {
      console.error('Request Error:', error);
      return Promise.reject(error);
    }
  );

  // 响应拦截器
  instance.interceptors.response.use(
    (response) => {
      console.log('Response Status:', response.status);
      console.log('Response Data:', response.data);
      return response.data;  // 返回响应数据
    },
    (error) => {
      console.error('API Error:', error);
      
      if (error.response?.status === 401) {
        // 清除认证信息
        localStorage.removeItem('authToken');
        localStorage.removeItem('username');
        message.error('登录已过期，请重新登录');
        window.location.href = '/login';
      } else {
        message.error(error.response?.data?.message || '请求失败');
      }
      
      return Promise.reject(error);
    }
  );

  return instance;
};

export const internalApi = createApiClient(API_CONFIG.INTERNAL);
export const externalApi = createApiClient(API_CONFIG.EXTERNAL); 
import axios from 'axios';
import { message } from 'antd';
import { API_CONFIG } from './config';

const createApiClient = (config) => {
  const instance = axios.create({
    baseURL: config.BASE_URL,
    timeout: config.TIMEOUT,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true, // 允许跨域请求携带 cookies
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
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // 响应拦截器
  instance.interceptors.response.use(
    (response) => {
      console.log('Response:', response); // 添加日志
      return response.data;  // 返回完整的响应对象
    },
    (error) => {
      console.error('API Error:', error); // 添加错误日志
      message.error(error.response?.data?.message || '请求失败');
      return Promise.reject(error);
    }
  );

  return instance;
};

export const internalApi = createApiClient(API_CONFIG.INTERNAL);
export const externalApi = createApiClient(API_CONFIG.EXTERNAL); 
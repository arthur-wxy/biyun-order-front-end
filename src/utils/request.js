import axios from 'axios';
import { message } from 'antd';

const instance = axios.create({
    baseURL: process.env.REACT_APP_INTERNAL_API_URL || 'http://localhost:8080/api',
    timeout: 10000,
});

// 请求拦截器
instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken');
        
        // 调试日志
        console.log('Token from localStorage:', token);
        
        if (token) {
            // 确保 headers 对象存在
            if (!config.headers) {
                config.headers = {};
            }
            
            // 设置 Authorization header
            config.headers = {
                ...config.headers,
                'Authorization': `${token}`
            };
            
            // 调试日志
            console.log('Final request config:', {
                url: config.url,
                method: config.method,
                headers: config.headers,
                baseURL: config.baseURL
            });
        }
        return config;
    },
    (error) => {
        console.error('Request interceptor error:', error);
        return Promise.reject(error);
    }
);

// 响应拦截器
instance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        console.error('Response error:', error);
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    // token 过期或无效
                    localStorage.removeItem('authToken');
                    localStorage.removeItem('username'); // 同时清除用户名
                    message.error('登录已过期，请重新登录');
                    window.location.href = '/login';
                    break;
                case 403:
                    message.error('没有权限访问');
                    break;
                default:
                    message.error('请求失败，请稍后重试');
            }
        } else {
            message.error('网络错误，请检查网络连接');
        }
        return Promise.reject(error);
    }
);

// 添加请求方法的包装器
const request = {
    get: (url, config = {}) => {
        console.log('Making GET request:', url);
        return instance.get(url, {
            ...config,
            headers: {
                ...config.headers,
                'Authorization': `${localStorage.getItem('authToken')}`
            }
        });
    },
    post: (url, data, config = {}) => {
        console.log('Making POST request:', url);
        return instance.post(url, data, {
            ...config,
            headers: {
                ...config.headers,
                'Authorization': `${localStorage.getItem('authToken')}`
            }
        });
    },
    // 添加其他方法如需要
};

export default request; 
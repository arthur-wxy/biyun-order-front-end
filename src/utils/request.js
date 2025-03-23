import axios from 'axios';
import { message } from 'antd';

const instance = axios.create({
    baseURL: 'http://localhost:8080',
    timeout: 10000,
});

// 请求拦截器
instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers['AuthToken'] = token;
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
        return response;
    },
    (error) => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    // token 过期或无效
                    localStorage.removeItem('authToken');
                    message.error('登录已过期，请重新登录');
                    window.location.href = '/login';
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

export default instance; 
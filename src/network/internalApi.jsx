import axios from 'axios';

const internalApi = axios.create({
    // baseURL: 'http://122.51.57.37/api/', 
    baseURL: 'http://localhost:8080/api', 
    timeout: 60000,
    withCredentials: false, // 跨域请求不发送 cookies
});

// 添加请求拦截器用于调试
internalApi.interceptors.request.use(
    config => {
        // 添加 CORS 相关头
        config.headers = {
            ...config.headers,
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
            'Access-Control-Allow-Headers': 'Content-Type'
        };

        // 如果数据是 FormData 类型，让浏览器自动设置正确的 Content-Type
        if (config.data instanceof FormData) {
            delete config.headers['Content-Type'];
        }
        
        console.log('Full Request URL:', config.baseURL + config.url);
        console.log('Request Method:', config.method);
        console.log('Request Headers:', config.headers);
        return config;
    },
    error => {
        console.error('Request Error:', error);
        return Promise.reject(error);
    }
);

// 添加响应拦截器用于调试
internalApi.interceptors.response.use(
    response => {
        console.log('Response Status:', response.status);
        console.log('Response Data:', response.data);
        return response;
    },
    error => {
        console.error('Response Error:', error.response || error);
        return Promise.reject(error);
    }
);

// 导出 API 实例和工具函数
export const useInternalApi = () => {
    return {
        get: async (url, config = {}) => await internalApi.get(url, config),
        post: async (url, data = {}, config = {}) => await internalApi.post(url, data, config),
        put: async (url, data = {}, config = {}) => await internalApi.put(url, data, config),
        del: async (url, config = {}) => await internalApi.delete(url, config),
        // 导出实例本身，以便访问配置
        instance: internalApi
    };
};
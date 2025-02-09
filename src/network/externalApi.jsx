import axios from 'axios';

const externalApi = axios.create({
    baseURL: 'https://api.thirdpartyservice.com', // 替换为你的第三方服务API基础URL
    timeout: 5000, // 根据需要调整超时时间
    headers: { 'Content-Type': 'application/json' },
});

export const useExternalApi = () => {
    const get = async (url, config = {}) => await externalApi.get(url, config);
    const post = async (url, data = {}, config = {}) => await externalApi.post(url, data, config);
    const put = async (url, data = {}, config = {}) => await externalApi.put(url, data, config);
    const del = async (url, config = {}) => await externalApi.delete(url, config);

    return { get, post, put, del };
};
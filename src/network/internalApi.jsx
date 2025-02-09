import axios from 'axios';

const internalApi = axios.create({
    // baseURL: 'http://122.51.57.37/api/', 
    baseURL: 'http://localhost:8080/api/', 
    timeout: 1000,
    headers: { 'Content-Type': 'application/json' },
});

export const useInternalApi = () => {
    const get = async (url, config = {}) => await internalApi.get(url, config);
    const post = async (url, data = {}, config = {}) => await internalApi.post(url, data, config);
    const put = async (url, data = {}, config = {}) => await internalApi.put(url, data, config);
    const del = async (url, config = {}) => await internalApi.delete(url, config);

    return { get, post, put, del };
};
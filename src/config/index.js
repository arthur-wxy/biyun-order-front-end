const env = process.env.NODE_ENV || 'development';

const config = {
  development: {
    API_BASE_URL: 'http://localhost:8080/api',
    UPLOAD_MAX_SIZE: 10 * 1024 * 1024,
    DEFAULT_LOCALE: 'zh-CN',
  },
  production: {
    API_BASE_URL: 'http://production-api.com/api',
    UPLOAD_MAX_SIZE: 10 * 1024 * 1024,
    DEFAULT_LOCALE: 'zh-CN',
  },
};

export default config[env]; 
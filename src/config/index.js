const env = process.env.NODE_ENV || 'development';

const config = {
  development: {
    API_BASE_URL: process.env.REACT_APP_INTERNAL_API_URL || 'http://localhost:8080/api',
    UPLOAD_MAX_SIZE: 10 * 1024 * 1024,
    DEFAULT_LOCALE: 'zh-CN',
  },
  production: {
    API_BASE_URL: process.env.REACT_APP_INTERNAL_API_URL || 'http://122.51.57.37:8080/api',
    UPLOAD_MAX_SIZE: 10 * 1024 * 1024,
    DEFAULT_LOCALE: 'zh-CN',
  },
};

export default config[env]; 
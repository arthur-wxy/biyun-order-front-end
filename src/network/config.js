export const API_CONFIG = {
  INTERNAL: {
    BASE_URL: process.env.REACT_APP_INTERNAL_API_URL || 'http://localhost:8080/api/',
    TIMEOUT: 5000,
  },
  EXTERNAL: {
    BASE_URL: process.env.REACT_APP_EXTERNAL_API_URL || 'https://api.thirdpartyservice.com',
    TIMEOUT: 10000,
  },
};

export const ENDPOINTS = {
  ORDERS: '/orders',
  MENU: '/menu/getMenuConf.json',
  UPLOAD: '/upload',
};

// 默认菜单配置，用于加载失败时的回退
export const DEFAULT_MENU_CONFIG = [
  {
    key: '/summary',
    label: '首页',
    path: '/summary'
  },
  {
    key: '/order_query',
    label: '订单查询',
    path: '/order_query'
  }
]; 
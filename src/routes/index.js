import { lazy } from 'react';

// 创建可预加载的懒加载组件
const createLazyComponent = (factory) => {
  const Component = lazy(factory);
  Component.preload = factory;
  return Component;
};

// 使用增强的懒加载
const OrderSearchForm = createLazyComponent(() => 
  import(/* webpackPrefetch: true */ '../components/order_query/OrderSearchForm')
);

const OrderImport = createLazyComponent(() => 
  import(/* webpackPrefetch: true */ '../components/order_query/OrderImport')
);

// 预加载单个路由组件
const preloadComponent = (route) => {
  if (route.element?.type?.preload) {
    route.element.type.preload();
  }
};

// 预加载所有子路由
const preloadChildRoutes = (route) => {
  if (route.children) {
    route.children.forEach(preloadComponent);
  }
};

export const routes = [
  {
    path: '/summary',
    element: <div>Summary</div>,
    title: 'menu.summary'
  },
  {
    path: '/order_query', 
    element: <OrderSearchForm />,
    title: 'menu.order_query'
  },
  {
    path: '/order_import',
    element: <OrderImport />,
    title: 'menu.order_import'
  }
];

// 导出预加载所有路由的函数
export const preloadRoutes = () => {
  routes.forEach((route) => {
    preloadComponent(route);
    preloadChildRoutes(route);
  });
};

// 导出预加载指定路由的函数
export const preloadRoute = (path) => {
  const route = routes.find(r => r.path === path);
  if (route) {
    preloadComponent(route);
  }
}; 
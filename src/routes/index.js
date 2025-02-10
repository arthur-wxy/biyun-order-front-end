import { lazy } from 'react';

// 使用路由懒加载
const OrderSearchForm = lazy(() => import('../components/order_query/OrderSearchForm'));
const OrderImport = lazy(() => import('../components/order_query/OrderImport'));

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
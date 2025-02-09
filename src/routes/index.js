import OrderSearchForm from '../components/order_query/OrderSearchForm';
import OrderImport from '../components/order_query/OrderImport';

export const routes = [
  {
    path: '/summary',
    element: <div>Summary</div>
  },
  {
    path: '/order_query', 
    element: <OrderSearchForm />
  },
  {
    path: '/order_import',
    element: <OrderImport />
  }
]; 
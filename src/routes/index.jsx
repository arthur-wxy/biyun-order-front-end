import React, { lazy, Suspense } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Spin } from 'antd';
import logger from '@/utils/logger';

logger('ROUTES', 'init', 'Loading route components...');

// 创建可预加载的懒加载组件
const createLazyComponent = (importFn, name) => {
  const LazyComponent = lazy(() => {
    logger('ROUTES', 'lazy-load', `Loading ${name} component`);
    return importFn().then(module => {
      logger('ROUTES', 'lazy-load', `${name} component loaded successfully`);
      return module;
    }).catch(error => {
      logger('ROUTES', 'error', `Failed to load ${name} component`, error);
      throw error;
    });
  });
  
  LazyComponent.preload = importFn;
  LazyComponent.displayName = name;
  return LazyComponent;
};

// 懒加载组件
const Summary = createLazyComponent(
  () => import('@/pages/Summary'),
  'Summary'
);

const OrderQuery = createLazyComponent(
  () => import('@/pages/OrderQuery'),
  'OrderQuery'
);

const OrderImport = createLazyComponent(
  () => import('@/pages/OrderImport'),
  'OrderImport'
);

const Quotation = createLazyComponent(
  () => import('@/pages/Quotation'),
  'Quotation'
);

const Login = createLazyComponent(
  () => import('@/pages/Login'),
  'Login'
);

const BillManage = createLazyComponent(
  () => import('@/pages/BillManage'),
  'BillManage'
);

// 路由守卫组件
const PrivateRoute = ({ children }) => {
  logger('ROUTES', 'auth', 'Checking authentication');
  const token = localStorage.getItem('authToken');
  if (!token) {
    logger('ROUTES', 'auth', 'No auth token found, redirecting to login');
    return <Navigate to="/login" replace />;
  }
  logger('ROUTES', 'auth', 'Auth token found, proceeding to protected route');
  return children;
};

// 包装懒加载组件
const LazyWrapper = ({ component: Component, requireAuth = true }) => {
  const location = useLocation();
  logger('ROUTES', 'render', `LazyWrapper rendering for path: ${location.pathname}`);

  const content = (
    <Suspense 
      fallback={
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <Spin size="large" />
        </div>
      }
    >
      <ErrorBoundary>
        <Component />
      </ErrorBoundary>
    </Suspense>
  );

  return requireAuth ? <PrivateRoute>{content}</PrivateRoute> : content;
};

// 错误边界组件
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    logger('ROUTES', 'error', 'Component failed to render', { error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '24px', textAlign: 'center' }}>
          <h2>Something went wrong.</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}

// 路由配置
const routes = [
  {
    path: '/',
    element: <Navigate to="/summary" replace />,
  },
  {
    path: '/summary',
    element: <LazyWrapper component={Summary} />,
  },
  {
    path: '/order_query',
    element: <LazyWrapper component={OrderQuery} />,
  },
  {
    path: '/order_import',
    element: <LazyWrapper component={OrderImport} />,
  },
  {
    path: '/quotation',
    element: <LazyWrapper component={Quotation} />,
  },
  {
    path: '/bill_manage',
    element: <LazyWrapper component={BillManage} />,
  },
  {
    path: '/login',
    element: <LazyWrapper component={Login} requireAuth={false} />,
  },
];

// 预加载指定路由的组件
export const preloadRoute = (path) => {
  logger('ROUTES', 'preload', `Preloading route for path: ${path}`);
  const route = routes.find(r => r.path === path);
  if (!route) {
    logger('ROUTES', 'warning', `No route found for path: ${path}`);
    return Promise.resolve();
  }
  
  const component = route.element.type;
  if (component?.preload) {
    return component.preload().then(() => {
      logger('ROUTES', 'preload', `Route preloaded successfully: ${path}`);
    }).catch(error => {
      logger('ROUTES', 'error', `Failed to preload route: ${path}`, error);
      throw error;
    });
  }
  return Promise.resolve();
};

// 预加载所有路由组件
export const preloadRoutes = () => {
  logger('ROUTES', 'preload', 'Preloading all route components');
  return Promise.all([
    Summary.preload(),
    OrderQuery.preload(),
    OrderImport.preload(),
    Quotation.preload(),
    BillManage.preload(),
    Login.preload(),
  ]).catch(error => {
    logger('ROUTES', 'error', 'Failed to preload routes', error);
    throw error;
  });
};

logger('ROUTES', 'config', 'Routes configured', routes.map(route => route.path));

export { routes };
export default routes; 
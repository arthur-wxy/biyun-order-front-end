import React from 'react';
import { BrowserRouter, useRoutes, useLocation } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { IntlProvider } from 'react-intl';
import zhCN from '@/locales/zh-CN';
import enUS from '@/locales/en-US';
import routes, { preloadRoutes } from './routes';
import MainLayout from './components/layout/MainLayout';
import AppMenu from './components/nav/Menu';
import logger from '@/utils/logger';

const AppRoutes = () => {
  const location = useLocation();
  logger('APP', 'routing', `Rendering routes for path: ${location.pathname}`);
  
  const element = useRoutes(routes);
  logger('APP', 'routing', 'Route element resolved', { 
    hasElement: !!element,
    path: location.pathname
  });
  
  return element;
};

const App = () => {
  logger('APP', 'init', 'App component initializing');
  const [locale, setLocale] = React.useState('zh-CN');
  const messages = locale === 'zh-CN' ? zhCN : enUS;
  const location = useLocation();

  React.useEffect(() => {
    logger('APP', 'mount', 'App component mounted');
    // 预加载所有路由
    preloadRoutes().catch(error => {
      logger('APP', 'error', 'Failed to preload routes', error);
    });
    return () => {
      logger('APP', 'unmount', 'App component unmounting');
    };
  }, []);

  const handleLocaleChange = React.useCallback((newLocale) => {
    setLocale(newLocale);
    logger('APP', 'locale', `Language changed to ${newLocale}`);
  }, []);

  // 如果是登录页面，不使用 MainLayout
  if (location.pathname === '/login') {
    return <AppRoutes />;
  }

  return (
    <IntlProvider messages={messages} locale={locale}>
      <ConfigProvider locale={locale === 'zh-CN' ? zhCN : enUS}>
        <MainLayout
          menu={<AppMenu />}
          onLocaleChange={handleLocaleChange}
          locale={locale}
        >
          <AppRoutes />
        </MainLayout>
      </ConfigProvider>
    </IntlProvider>
  );
};

const AppWrapper = () => {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};

export default AppWrapper; 
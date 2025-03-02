import React, { Suspense, useEffect } from 'react';
import MainLayout from './components/layout/MainLayout';
import MyMenu from './components/nav/Menu';
import ErrorBoundary from './components/ErrorBoundary';
import { LoadingSpinner } from './components/LoadingSpinner';
import { preloadRoutes } from './routes';

function App() {
  useEffect(() => {
    // 在应用加载后的空闲时间预加载所有路由
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(() => {
        preloadRoutes();
      });
    } else {
      // 降级处理
      setTimeout(preloadRoutes, 1000);
    }
  }, []);

  return (
    <ErrorBoundary>
      <div className="App">
        <Suspense fallback={<LoadingSpinner />}>
          <MainLayout menu={<MyMenu />} />
        </Suspense>
      </div>
    </ErrorBoundary>
  );
}

export default App;

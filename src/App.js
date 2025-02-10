import React, { Suspense } from 'react';
import MainLayout from './components/layout/MainLayout';
import MyMenu from './components/nav/Menu';
import ErrorBoundary from './components/ErrorBoundary';
import { LoadingSpinner } from './components/LoadingSpinner';

function App() {
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

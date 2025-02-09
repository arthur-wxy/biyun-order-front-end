import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import { BrowserRouter as Router } from 'react-router-dom';
import { store } from './store';
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <ConfigProvider
          locale={zhCN}
          theme={{
            token: {
              colorPrimary: '#1890ff',
            },
          }}
        >
          <App />
        </ConfigProvider>
      </Router>
    </Provider>
  </React.StrictMode>
);
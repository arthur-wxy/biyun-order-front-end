import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import enUS from 'antd/locale/en_US';
import { BrowserRouter as Router } from 'react-router-dom';
import { store } from './store';
import App from './App';
import { LocaleProvider, LocaleContext } from './contexts/LocaleContext';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from './styles/theme';
import { GlobalStyles } from './styles/GlobalStyles';
import './index.css';

// 创建一个包装组件来处理 antd 的本地化
const AntConfigWrapper = () => {
  const { locale } = React.useContext(LocaleContext);
  
  return (
    <ConfigProvider
      locale={locale === 'zh-CN' ? zhCN : enUS}
      theme={{
        token: {
          colorPrimary: lightTheme.colors.primary,
        },
      }}
    >
      <App />
    </ConfigProvider>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <LocaleProvider>
        <Router>
          <ThemeProvider theme={lightTheme}>
            <GlobalStyles />
            <AntConfigWrapper />
          </ThemeProvider>
        </Router>
      </LocaleProvider>
    </Provider>
  </React.StrictMode>
);
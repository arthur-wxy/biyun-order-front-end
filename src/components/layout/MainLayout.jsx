import React, { useState, useCallback } from 'react';
import { Layout, theme } from 'antd';
import SiderHeader from './SiderHeader';
import { Routes, Route } from 'react-router-dom';
import { routes } from '../../routes';
import { layoutStyles } from '../../styles/layoutStyles';
import { ThemeProvider } from 'styled-components';

const { Header, Content, Footer, Sider } = Layout;

// 主题配置
const customTheme = {
  siderHeaderBg: 'rgba(255, 255, 255, 0.1)',
  // 其他主题变量...
};

// 获取默认Logo组件
const getDefaultLogo = (collapsed) => (
  <SiderHeader 
    collapsed={collapsed}
    onClick={() => console.log('Logo clicked')}
  />
);

// 主布局组件
const MainLayout = ({ logo, menu }) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleCollapse = useCallback((value) => {
    setCollapsed(value);
  }, []);

  return (
    <ThemeProvider theme={customTheme}>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider 
          collapsible 
          collapsed={collapsed} 
          onCollapse={handleCollapse}
          {...layoutStyles.sider}
        >
          {logo || getDefaultLogo(collapsed)}
          {menu}
        </Sider>
        <Layout>
          <Header style={{ 
            ...layoutStyles.header,
            background: colorBgContainer 
          }} />
          <Content style={{ 
            ...layoutStyles.content,
            background: colorBgContainer
          }}>
            <Routes>
              {routes.map(route => (
                <Route 
                  key={route.path}
                  path={route.path}
                  element={route.element}
                />
              ))}
            </Routes>
          </Content>
          <Footer style={layoutStyles.footer}>
            ©2024 Created by Your Company
          </Footer>
        </Layout>
      </Layout>
    </ThemeProvider>
  );
};

export default MainLayout;
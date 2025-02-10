import React, { useState, useCallback } from 'react';
import { Button } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined, GlobalOutlined } from '@ant-design/icons';
import { Routes, Route } from 'react-router-dom';
import { useLocale } from '../../hooks/useLocale';
import { routes } from '../../routes';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from '../../styles/theme';
import { GlobalStyles } from '../../styles/GlobalStyles';
import SiderHeader from './SiderHeader';
import {
  StyledLayout,
  StyledSider,
  StyledHeader,
  StyledContent,
  ContentWrapper,
  InnerLayout
} from './styles/Layout.styles';

const SIDER_WIDTH = 200;
const COLLAPSED_WIDTH = 80;

// 获取默认Logo组件
const getDefaultLogo = (collapsed) => (
  <SiderHeader 
    collapsed={collapsed}
    onClick={() => console.log('Logo clicked')}
  />
);

const MainLayout = ({ logo, menu }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { toggleLocale, locale } = useLocale();

  const handleCollapse = useCallback((value) => {
    setCollapsed(value);
  }, []);

  const siderWidth = collapsed ? COLLAPSED_WIDTH : SIDER_WIDTH;

  return (
    <ThemeProvider theme={lightTheme}>
      <GlobalStyles />
      <StyledLayout>
        <StyledSider
          collapsible
          collapsed={collapsed}
          onCollapse={handleCollapse}
          breakpoint="lg"
          collapsedWidth={COLLAPSED_WIDTH}
          width={SIDER_WIDTH}
        >
          {logo || getDefaultLogo(collapsed)}
          {menu}
        </StyledSider>
        <InnerLayout $siderWidth={siderWidth}>
          <StyledHeader $siderWidth={siderWidth}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              className="trigger"
            />
            <Button
              icon={<GlobalOutlined />}
              onClick={toggleLocale}
            >
              {locale.startsWith('zh') ? 'English' : '中文'}
            </Button>
          </StyledHeader>
          <StyledContent>
            <ContentWrapper>
              <Routes>
                {routes.map(route => (
                  <Route
                    key={route.path}
                    path={route.path}
                    element={route.element}
                  />
                ))}
              </Routes>
            </ContentWrapper>
          </StyledContent>
        </InnerLayout>
      </StyledLayout>
    </ThemeProvider>
  );
};

export default MainLayout;
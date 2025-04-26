import React, { useState, useCallback } from 'react';
import { Button, Space } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined, GlobalOutlined } from '@ant-design/icons';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from '../../styles/theme';
import { GlobalStyles } from '../../styles/GlobalStyles';
import SiderHeader from './SiderHeader';
import UserStatus from '../UserStatus';
import {
  StyledLayout,
  StyledSider,
  StyledHeader,
  StyledContent,
  ContentWrapper,
  InnerLayout,
  HeaderRight
} from './styles/Layout.styles';
import { useLocation } from 'react-router-dom';
import logger from '@/utils/logger';

const SIDER_WIDTH = 200;
const COLLAPSED_WIDTH = 80;

// 获取默认Logo组件
const getDefaultLogo = (collapsed) => (
  <SiderHeader 
    collapsed={collapsed}
    onClick={() => console.log('Logo clicked')}
  />
);

const MainLayout = ({ logo, menu, children, onLocaleChange, locale }) => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  React.useEffect(() => {
    logger('LAYOUT', 'mount', 'MainLayout component mounted');
    return () => {
      logger('LAYOUT', 'unmount', 'MainLayout component unmounting');
    };
  }, []);

  React.useEffect(() => {
    logger('LAYOUT', 'route', 'Route changed', { path: location.pathname });
  }, [location.pathname]);

  const handleCollapse = useCallback((value) => {
    setCollapsed(value);
    logger('LAYOUT', 'action', 'Sider collapsed state changed', { collapsed: value });
  }, []);

  const handleLocaleToggle = useCallback(() => {
    const newLocale = locale === 'zh-CN' ? 'en-US' : 'zh-CN';
    onLocaleChange?.(newLocale);
    logger('LAYOUT', 'action', 'Language toggled', { from: locale, to: newLocale });
  }, [locale, onLocaleChange]);

  const siderWidth = collapsed ? COLLAPSED_WIDTH : SIDER_WIDTH;

  logger('LAYOUT', 'render', 'Rendering main layout', {
    path: location.pathname,
    collapsed,
    locale
  });
  logger('LAYOUT', 'render', 'Rendering main layout', {
    content:children
  })

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
              onClick={() => handleCollapse(!collapsed)}
              className="trigger"
            />
            <HeaderRight>
              <Space align="center">
                <Button
                  icon={<GlobalOutlined />}
                  onClick={handleLocaleToggle}
                >
                  {locale === 'zh-CN' ? 'English' : '中文'}
                </Button>
                <UserStatus />
              </Space>
            </HeaderRight>
          </StyledHeader>
          <StyledContent>
            <ContentWrapper>
              {children}
            </ContentWrapper>
          </StyledContent>
        </InnerLayout>
      </StyledLayout>
    </ThemeProvider>
  );
};

export default MainLayout;
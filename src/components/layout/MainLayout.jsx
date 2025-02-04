import React, { useState } from 'react';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import CompanyIntroduction from './SilderHeader';

const { Header, Content, Footer, Sider } = Layout;

const getDefaultLogo = () => {
    return (<>
        <CompanyIntroduction/>
    </>);
}

// 主布局组件
const MainLayout = ({ logo=getDefaultLogo(), menu, header, content, footer}) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout style={{ minHeight: '1000vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        {logo}
        {menu}
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
        {header}
        </Header>
        <Content style={{ margin: '0 16px' }}>
          {content}
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          {footer}
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
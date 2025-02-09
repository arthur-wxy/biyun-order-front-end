import React, { useState } from 'react';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import CompanyIntroduction from './SilderHeader';
import { Routes, BrowserRouter as Router, Route } from 'react-router-dom';
import OrderSearchForm from '../order_query/OrderSearchForm';
import OrderImport from '../order_query/OrderImport';

const { Header, Content, Footer, Sider } = Layout;

const getDefaultLogo = () => {
  return (<>
    <CompanyIntroduction />
  </>);
}

// 主布局组件
const MainLayout = ({ logo = getDefaultLogo(), menu }) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Router>
      <Layout style={{ minHeight: '1000vh', width: '256' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
          {logo}
          {menu}
        </Sider>
        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer }}>

          </Header>
          <Content style={{ margin: '0 16px' }}>
            <Routes>
              <Route path='/summary' element={<div>Summary</div>}/>
              <Route path='/order_query' element={<OrderSearchForm/>}/>
              <Route path='/order_import' element={<OrderImport />}/>          
            </Routes>
          </Content>
          <Footer style={{ textAlign: 'center' }}>

          </Footer>
        </Layout>
      </Layout>
    </Router>
  );
};

export default MainLayout;
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import 'antd/dist/reset.css';

const { Header, Content } = Layout;

// 页面组件
const pages = {
  home: { path: '/', title: 'Home', component: () => <div>Home Page</div> },
  about: { path: '/about', title: 'About', component: () => <div>About Page</div> },
  contact: { path: '/contact', title: 'Contact', component: () => <div>Contact Page</div> }
};

const MyApp = () => {
  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Header>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['home']}>
            {Object.entries(pages).map(([key, { path, title }]) => (
              <Menu.Item key={key}>
                <Link to={path}>{title}</Link>
              </Menu.Item>
            ))}
          </Menu>
        </Header>
        <Content style={{ padding: '24px 50px' }}>
          <div style={{ 
            padding: 24, 
            background: '#fff', 
            minHeight: 360,
            borderRadius: '4px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.12)'
          }}>
            <Routes>
              {Object.entries(pages).map(([key, { path, component: Component }]) => (
                <Route key={key} path={path} element={<Component />} />
              ))}
            </Routes>
          </div>
        </Content>
      </Layout>
    </Router>
  );
};

export default MyApp;
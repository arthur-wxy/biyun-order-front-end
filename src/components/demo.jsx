import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import 'antd/dist/reset.css'; // 引入 Ant Design 样式

const { Header, Content } = Layout;

// 示例内容组件
const HomePage = () => <div>Home Page</div>;
const AboutPage = () => <div>About Page</div>;
const ContactPage = () => <div>Contact Page</div>;

const MyApp = () => {
  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Header>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/about">About</Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/contact">Contact</Link>
            </Menu.Item>
          </Menu>
        </Header>
        <Content style={{ margin: '0 16px' }}>
          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </div>
        </Content>
      </Layout>
    </Router>
  );
};

export default MyApp;
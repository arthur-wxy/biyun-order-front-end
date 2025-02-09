import React from 'react';
import { Menu, Spin } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { useMenu } from './hooks/useMenu';
import { DEFAULT_MENU_CONFIG } from '../../network/config';

const renderMenuItem = (item) => {
  if (item.children) {
    return {
      key: item.key,
      label: item.label,
      icon: item.icon,
      children: item.children.map(child => renderMenuItem(child))
    };
  }

  return {
    key: item.key,
    label: item.path ? <Link to={item.path}>{item.label}</Link> : item.label,
    icon: item.icon
  };
};

const AppMenu = () => {
  const location = useLocation();
  const { menuItems, loading, error } = useMenu();

  // 添加日志
  console.log('Current menu items:', menuItems);
  console.log('Is Array?', Array.isArray(menuItems));
  
  const items = Array.isArray(menuItems) ? menuItems : DEFAULT_MENU_CONFIG;
  const processedItems = items.map(item => renderMenuItem(item));

  return (
    <>
      {loading && (
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <Spin size="small" />
        </div>
      )}
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[location.pathname]}
        defaultOpenKeys={['order_manage']} // 默认展开订单管理
        items={processedItems}
      />
    </>
  );
};

export default React.memo(AppMenu);
import { useState } from 'react';
import { DEFAULT_MENU_CONFIG } from '../../../network/config';

// 转换菜单数据的函数
const transformMenuData = (menuData) => {
  if (!menuData || !Array.isArray(menuData)) return DEFAULT_MENU_CONFIG;
  
  return menuData.map(item => {
    const menuItem = {
      key: item.key,
      label: item.label,
      path: item.link || item.key, // 使用 link 或 fallback 到 key
      icon: item.icon
    };

    // 处理子菜单
    if (item.children && Array.isArray(item.children)) {
      menuItem.children = item.children.map(child => ({
        key: child.key,
        label: child.label,
        path: child.link || child.key,
        icon: child.icon
      }));
    }

    return menuItem;
  });
};

export const useMenu = () => {
  const [menuItems, setMenuItems] = useState([
    {
      key: 'summary',
      label: 'menu.summary',
      path: '/summary'
    },
    {
      key: 'order_manage',
      label: 'menu.order_manage',
      children: [
        {
          key: 'order_query',
          label: 'menu.order_query',
          path: '/order_query'
        },
        {
          key: 'order_import',
          label: 'menu.order_import',
          path: '/order_import'
        }
      ]
    },
    {
      key: 'bill_manage',
      label: 'menu.bill_manage'
    },
    {
      key: 'logistics_manage',
      label: 'menu.logistics_manage'
    }
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  return { 
    menuItems, 
    loading, 
    error
  };
}; 
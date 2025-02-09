import { useState, useEffect } from 'react';
import { useInternalApi } from '../../../network/internalApi';
import { ENDPOINTS, DEFAULT_MENU_CONFIG } from '../../../network/config';

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
  const [menuItems, setMenuItems] = useState(DEFAULT_MENU_CONFIG);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const api = useInternalApi();

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        setLoading(true);
        const response = await api.get(ENDPOINTS.MENU);
        console.log('Menu API Response:', response);
        
        if (response?.data?.success && Array.isArray(response.data.content)) {
          const transformedMenu = transformMenuData(response.data.content);
          console.log('Transformed menu items:', transformedMenu);
          setMenuItems(transformedMenu);
        } else {
          console.warn('Invalid menu data:', response);
          setMenuItems(DEFAULT_MENU_CONFIG);
        }
      } catch (err) {
        console.error('Failed to fetch menu:', err);
        setError(err.message);
        setMenuItems(DEFAULT_MENU_CONFIG);
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  return { 
    menuItems, 
    loading, 
    error
  };
}; 
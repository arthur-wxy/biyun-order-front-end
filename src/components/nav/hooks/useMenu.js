import { useState, useEffect } from 'react';
import axios from 'axios';
import { DEFAULT_MENU_CONFIG } from '../../../network/config';

export const useMenu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenuConfig = async () => {
      setLoading(true);
      try {
        // 获取认证令牌
        const token = localStorage.getItem('authToken');
        console.log('正在获取菜单配置，认证令牌:', token ? '存在' : '不存在');
        
        // 发送请求获取菜单配置
        const response = await axios.get('http://localhost:8080/view/getMenuConf.json', {
          headers: {
            'Authorization': token || ''
          }
        });

        console.log('菜单配置API响应:', response.data);

        if (response.data.success) {
          // 转换数据格式
          const formattedMenu = transformMenuData(response.data.content);
          console.log('格式化后的菜单配置:', formattedMenu);
          setMenuItems(formattedMenu);
        } else {
          console.error('获取菜单配置失败:', response.data.errorMsg);
          setError(response.data.errorMsg || '获取菜单配置失败');
          setMenuItems(DEFAULT_MENU_CONFIG); // 使用默认配置
        }
      } catch (error) {
        console.error('获取菜单配置出错:', error);
        setError(error.message || '获取菜单配置出错');
        setMenuItems(DEFAULT_MENU_CONFIG); // 使用默认配置
      } finally {
        setLoading(false);
      }
    };

    fetchMenuConfig();
  }, []);

  // 转换菜单数据的函数
  const transformMenuData = (menuData) => {
    if (!menuData || !Array.isArray(menuData)) return DEFAULT_MENU_CONFIG;
    
    return menuData.map(item => {
      const menuItem = {
        key: item.key,
        label: item.label,
        path: item.link || `/${item.key}`, // 使用link或根据key创建路径
        icon: item.icon
      };

      // 处理子菜单
      if (item.children && Array.isArray(item.children)) {
        menuItem.children = item.children.map(child => ({
          key: child.key,
          label: child.label,
          path: child.link || `/${item.key}/${child.key}`,
          icon: child.icon
        }));
      }

      return menuItem;
    });
  };

  return { 
    menuItems, 
    loading, 
    error
  };
}; 
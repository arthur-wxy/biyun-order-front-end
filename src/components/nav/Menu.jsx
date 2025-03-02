import React from 'react';
import { Menu, Spin } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { useMenu } from './hooks/useMenu';
import { useIntl } from 'react-intl';
import styled from 'styled-components';
import { preloadRoute } from '../../routes';

// 添加样式来控制菜单项在收缩状态下的显示
const StyledMenu = styled(Menu)`
  // 基础样式
  &.ant-menu {
    background: transparent;
    color: rgba(255, 255, 255, 0.85);
  }

  // 菜单项样式
  .ant-menu-item,
  .ant-menu-submenu-title {
    color: rgba(255, 255, 255, 0.85) !important;

    &:hover {
      color: #fff !important;
    }

    .ant-menu-title-content {
      a {
        color: rgba(255, 255, 255, 0.85) !important;
        &:hover {
          color: #fff !important;
        }
      }
    }
  }

  // 选中状态
  .ant-menu-item-selected {
    background-color: #1890ff !important;
    
    .ant-menu-title-content {
      a {
        color: #fff !important;
      }
    }
  }

  // 子菜单样式
  .ant-menu-sub {
    background: transparent !important;
    
    .ant-menu-item {
      background: transparent !important;
    }
  }

  // 收缩状态样式
  &.ant-menu-inline-collapsed {
    .ant-menu-item,
    .ant-menu-submenu-title {
      padding-inline: 0 !important;
      text-align: center;

      .ant-menu-title-content {
        display: inline-block;
        max-width: 100%;
        width: 100%;
        text-align: center;
        
        a {
          display: inline-block;
          max-width: 100%;
          width: 100%;
          text-align: center;
        }
      }

      .ant-menu-item-icon {
        line-height: 40px;
        margin-inline-end: 0;
      }
    }

    .ant-menu-item .ant-menu-title-content,
    .ant-menu-submenu-title .ant-menu-title-content {
      opacity: 1;
      width: 100%;
      padding: 0;
      text-align: center;

      a, span {
        position: relative;
        display: inline-block;
        width: 100%;
        height: 100%;
        overflow: hidden;
        text-overflow: clip;
        
        &::before {
          content: attr(data-first-letter);
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          color: rgba(255, 255, 255, 0.85);
        }

        & > span {
          opacity: 0;
        }
      }
    }
  }
`;

const renderMenuItem = (item, intl) => {
  const label = intl.formatMessage({ id: item.label });
  const firstLetter = label.charAt(0);

  // 处理鼠标悬停事件
  const handleMouseEnter = () => {
    if (item.path) {
      preloadRoute(item.path);
    }
  };

  if (item.children) {
    return {
      key: item.key,
      label: <span data-first-letter={firstLetter}><span>{label}</span></span>,
      children: item.children.map(child => renderMenuItem(child, intl)),
      onMouseEnter: handleMouseEnter
    };
  }

  return {
    key: item.key,
    label: item.path ? (
      <Link to={item.path} data-first-letter={firstLetter}>
        <span>{label}</span>
      </Link>
    ) : (
      <span data-first-letter={firstLetter}><span>{label}</span></span>
    ),
    onMouseEnter: handleMouseEnter
  };
};

const AppMenu = () => {
  const location = useLocation();
  const { menuItems, loading } = useMenu();
  const intl = useIntl();
  
  const processedItems = menuItems.map(item => renderMenuItem(item, intl));

  return (
    <>
      {loading && (
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <Spin size="small" />
        </div>
      )}
      <StyledMenu
        theme="dark"
        mode="inline"
        selectedKeys={[location.pathname]}
        defaultOpenKeys={['order_manage']}
        items={processedItems}
      />
    </>
  );
};

export default React.memo(AppMenu);
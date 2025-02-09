import React, { memo, useCallback } from 'react';
import { Skeleton, message } from 'antd';
import PropTypes from 'prop-types';
import { HeaderContainer, StyledImage } from './styles/SiderHeader.styles';
import { useTheme } from 'styled-components';

const SiderHeader = memo(({ 
  logo = '/logo.png',
  alt = '公司标志',
  fallback = '/fallback-logo.png',
  collapsed = false,
  onClick,
  className
}) => {
  const theme = useTheme();
  
  // 处理图片加载错误
  const handleError = useCallback(() => {
    message.error('Logo加载失败，已显示备用图片');
  }, []);

  // 处理图片点击
  const handleClick = useCallback((e) => {
    onClick?.(e);
  }, [onClick]);

  return (
    <HeaderContainer 
      collapsed={collapsed}
      className={className}
      theme={theme}
    >
      <StyledImage
        src={logo}
        alt={alt}
        preview={false}
        fallback={fallback}
        placeholder={
          <Skeleton.Image 
            active 
            style={{ width: collapsed ? '32px' : '200px' }} 
          />
        }
        onClick={handleClick}
        onError={handleError}
        collapsed={collapsed}
        loading="lazy"
      />
    </HeaderContainer>
  );
});

SiderHeader.propTypes = {
  logo: PropTypes.string,
  alt: PropTypes.string,
  fallback: PropTypes.string,
  collapsed: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string
};

// 显示组件名称，便于调试
SiderHeader.displayName = 'SiderHeader';

export default SiderHeader; 
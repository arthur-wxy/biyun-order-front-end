import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body, #root {
    height: 100vh;
    width: 100%;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
      'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
      'Noto Color Emoji';
    overflow: hidden;  // 防止出现双滚动条
  }

  .ant-layout {
    height: 100vh;
    overflow: hidden;
  }

  // 统一间距
  .content-padding {
    padding: ${props => props.theme.spacing.md};
  }

  // 统一卡片样式
  .content-card {
    background: ${props => props.theme.colors.background};
    border-radius: ${props => props.theme.borderRadius.md};
    box-shadow: ${props => props.theme.shadows.sm};
    padding: ${props => props.theme.spacing.lg};
  }

  // 响应式布局辅助类
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    .hide-on-mobile {
      display: none;
    }
    .content-padding {
      padding: ${props => props.theme.spacing.sm};
    }
  }
`; 
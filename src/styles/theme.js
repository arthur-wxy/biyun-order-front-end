export const baseTheme = {
  colors: {
    primary: '#1890ff',
    success: '#52c41a',
    warning: '#faad14',
    error: '#f5222d',
    background: '#ffffff',
    text: '#000000',
    textSecondary: '#666666',
    border: '#d9d9d9',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  },
  breakpoints: {
    xs: '480px',
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
    xxl: '1600px',
  },
  borderRadius: {
    sm: '2px',
    md: '4px',
    lg: '8px',
    xl: '16px',
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  },
  transitions: {
    quick: '0.2s',
    normal: '0.3s',
    slow: '0.5s',
  },
  zIndex: {
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modal: 1040,
    popover: 1050,
    tooltip: 1060,
  },
};

export const lightTheme = {
  ...baseTheme,
  type: 'light',
  colors: {
    ...baseTheme.colors,
    background: '#ffffff',
    text: '#000000',
    textSecondary: '#666666',
    border: '#d9d9d9',
  },
};

export const darkTheme = {
  ...baseTheme,
  type: 'dark',
  colors: {
    ...baseTheme.colors,
    background: '#141414',
    text: '#ffffff',
    textSecondary: '#999999',
    border: '#434343',
  },
}; 
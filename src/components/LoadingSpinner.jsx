import React from 'react';
import { Spin } from 'antd';
import { useIntl } from 'react-intl';

export const LoadingSpinner = () => {
  const intl = useIntl();
  
  return (
    <div style={{ 
      padding: '50px', 
      textAlign: 'center',
      background: 'rgba(255, 255, 255, 0.8)',
      borderRadius: '4px'
    }}>
      <Spin size="large" tip={intl.formatMessage({ id: 'common.loading' })} />
    </div>
  );
}; 
import React from 'react';
import { Card } from 'antd';
import { useIntl } from 'react-intl';
import logger from '@/utils/logger';

const BillManage = () => {
  const intl = useIntl();
  
  logger('BILL_MANAGE', 'render', 'Rendering BillManage component');

  return (
    <Card title={intl.formatMessage({ id: 'menu.bill_manage' })}>
      <div>账单管理页面正在开发中...</div>
    </Card>
  );
};

export default BillManage; 
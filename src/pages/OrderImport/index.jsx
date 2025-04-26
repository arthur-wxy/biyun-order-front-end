import React from 'react';
import { Card } from 'antd';
import { useIntl } from 'react-intl';
import logger from '@/utils/logger';
import OrderImportComponent from '@/components/order_query/OrderImport';

const OrderImport = () => {
  const intl = useIntl();
  
  logger('ORDER_IMPORT', 'render', 'Rendering OrderImport component');

  return (
    <Card title={intl.formatMessage({ id: 'menu.order_import' })}>
      <OrderImportComponent />
    </Card>
  );
};

export default OrderImport; 
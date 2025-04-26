import React, { useEffect } from 'react';
import { Card } from 'antd';
import { useIntl } from 'react-intl';
import logger from '@/utils/logger';
import OrderSearchForm from '@/components/order_query/OrderSearchForm';

const OrderQuery = () => {
  const intl = useIntl();

  useEffect(() => {
    logger('ORDER_QUERY', 'mount', 'OrderQuery component mounted');
    return () => {
      logger('ORDER_QUERY', 'unmount', 'OrderQuery component unmounting');
    };
  }, []);

  logger('ORDER_QUERY', 'render', 'Rendering order query component');

  return (
    <Card 
      title={intl.formatMessage({ id: 'menu.order_query' })}
      bordered={false}
    >
      <OrderSearchForm />
    </Card>
  );
};

export default OrderQuery; 
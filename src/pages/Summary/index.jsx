import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Statistic } from 'antd';
import { useIntl } from 'react-intl';
import logger from '@/utils/logger';

const Summary = () => {
  const intl = useIntl();
  const [data, setData] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    totalQuotations: 0,
    activeQuotations: 0
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    logger('SUMMARY', 'mount', 'Summary component mounted');
    fetchSummaryData();
    return () => {
      logger('SUMMARY', 'unmount', 'Summary component unmounting');
    };
  }, []);

  const fetchSummaryData = async () => {
    logger('SUMMARY', 'data', 'Fetching summary data');
    setLoading(true);
    try {
      // TODO: Replace with actual API call
      const mockData = {
        totalOrders: 150,
        pendingOrders: 30,
        totalQuotations: 80,
        activeQuotations: 25
      };
      setData(mockData);
      logger('SUMMARY', 'data', 'Summary data fetched successfully', mockData);
    } catch (error) {
      logger('SUMMARY', 'error', 'Failed to fetch summary data', { error: error.message });
    } finally {
      setLoading(false);
    }
  };

  logger('SUMMARY', 'render', 'Rendering summary component', { loading });

  return (
    <Card title={intl.formatMessage({ id: 'menu.summary' })} loading={loading}>
      <Row gutter={16}>
        <Col span={6}>
          <Statistic
            title={intl.formatMessage({ id: 'summary.total_orders' })}
            value={data.totalOrders}
          />
        </Col>
        <Col span={6}>
          <Statistic
            title={intl.formatMessage({ id: 'summary.pending_orders' })}
            value={data.pendingOrders}
          />
        </Col>
        <Col span={6}>
          <Statistic
            title={intl.formatMessage({ id: 'summary.total_quotations' })}
            value={data.totalQuotations}
          />
        </Col>
        <Col span={6}>
          <Statistic
            title={intl.formatMessage({ id: 'summary.active_quotations' })}
            value={data.activeQuotations}
          />
        </Col>
      </Row>
    </Card>
  );
};

export default Summary; 
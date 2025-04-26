import React from 'react';
import { Form, Input, Select, DatePicker, Button, Space, Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const { RangePicker } = DatePicker;

const StyledForm = styled(Form)`
  .ant-form-item {
    margin-bottom: 0;
  }
`;

const StyledButton = styled(Button)`
  margin-left: 8px;
`;

const OrderSearchForm = ({ onSearch, loading }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const handleReset = () => {
    form.resetFields();
    onSearch({});
  };

  return (
    <StyledForm
      form={form}
      onFinish={onSearch}
      layout="inline"
      style={{ width: '100%', display: 'flex', alignItems: 'center', flexWrap: 'nowrap' }}
    >
      <Row gutter={8} style={{ width: '100%', margin: 0 }}>
        <Col>
          <Form.Item name="orderNo" style={{ margin: 0 }}>
            <Input
              placeholder={t('order.search.orderNo')}
              allowClear
              style={{ width: 180 }}
            />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item name="externalOrderNo" style={{ margin: 0 }}>
            <Input
              placeholder={t('order.search.externalOrderNo')}
              allowClear
              style={{ width: 180 }}
            />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item name="status" style={{ margin: 0 }}>
            <Select
              placeholder={t('order.search.status')}
              allowClear
              style={{ width: 120 }}
              options={[
                { value: 'all', label: t('order.search.status.all') },
                { value: 'pending', label: t('order.search.status.pending') },
                { value: 'completed', label: t('order.search.status.completed') },
                { value: 'cancelled', label: t('order.search.status.cancelled') },
              ]}
            />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item name="dateRange" style={{ margin: 0 }}>
            <RangePicker
              style={{ width: 240 }}
              showTime
              format="YYYY-MM-DD HH:mm:ss"
            />
          </Form.Item>
        </Col>
        <Col style={{ marginLeft: 'auto' }}>
          <Space>
            <StyledButton
              type="primary"
              htmlType="submit"
              icon={<SearchOutlined />}
              loading={loading}
            >
              {t('order.search.submit')}
            </StyledButton>
            <StyledButton
              onClick={handleReset}
              icon={<ReloadOutlined />}
            >
              {t('order.search.reset')}
            </StyledButton>
          </Space>
        </Col>
      </Row>
    </StyledForm>
  );
};

export default OrderSearchForm; 
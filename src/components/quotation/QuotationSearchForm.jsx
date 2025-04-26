import React from 'react';
import { Form, Input, Button, Row, Col, Space } from 'antd';
import { useIntl } from 'react-intl';
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const StyledForm = styled(Form)`
  .ant-form-item {
    margin-bottom: 0;
  }
`;

const StyledButton = styled(Button)`
  margin-left: 8px;
`;

const QuotationSearchForm = ({ onSearch, loading }) => {
  const intl = useIntl();
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
          <Form.Item name="quotation_id" style={{ margin: 0 }}>
            <Input
              placeholder={intl.formatMessage({ id: 'quotation.search.id' })}
              allowClear
              style={{ width: 120 }}
            />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item name="sku" style={{ margin: 0 }}>
            <Input
              placeholder={intl.formatMessage({ id: 'quotation.search.sku' })}
              allowClear
              style={{ width: 120 }}
            />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item name="product_name" style={{ margin: 0 }}>
            <Input
              placeholder={intl.formatMessage({ id: 'quotation.search.productName' })}
              allowClear
              style={{ width: 180 }}
            />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item name="region_code" style={{ margin: 0 }}>
            <Input
              placeholder={intl.formatMessage({ id: 'quotation.search.region' })}
              allowClear
              style={{ width: 120 }}
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
              {intl.formatMessage({ id: 'quotation.search.submit' })}
            </StyledButton>
            <StyledButton
              onClick={handleReset}
              icon={<ReloadOutlined />}
            >
              {intl.formatMessage({ id: 'quotation.search.reset' })}
            </StyledButton>
          </Space>
        </Col>
      </Row>
    </StyledForm>
  );
};

export default QuotationSearchForm; 
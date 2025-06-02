import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Row, Col, Space, Select } from 'antd';
import { useIntl } from 'react-intl';
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { internalApi } from '../../network/apiClient';

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
  const [skuOptions, setSkuOptions] = useState([]);
  const [productNameOptions, setProductNameOptions] = useState([]);
  const [skuSearchValue, setSkuSearchValue] = useState('');
  const [productNameSearchValue, setProductNameSearchValue] = useState('');

  // 组件加载时获取 SKU 和产品名称列表
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        // 获取 SKU 列表
        const skuResponse = await internalApi.get('/quotationManagement/getAllSkus.json');
        if (skuResponse.success) {
          setSkuOptions(skuResponse.content.map(sku => ({ value: sku, label: sku })));
        }

        // 获取产品名称列表
        const productNameResponse = await internalApi.get('/quotationManagement/getAllProductNames.json');
        if (productNameResponse.success) {
          setProductNameOptions(productNameResponse.content.map(name => ({ value: name, label: name })));
        }
      } catch (error) {
        console.error('Failed to fetch options:', error);
      }
    };

    fetchOptions();
  }, []);

  const handleReset = () => {
    form.resetFields();
    setSkuSearchValue('');
    setProductNameSearchValue('');
    onSearch({});
  };

  // 过滤 SKU 选项
  const filterSkuOptions = (input) => {
    const searchValue = input.toLowerCase();
    return skuOptions.filter(option => 
      option.label.toLowerCase().includes(searchValue)
    );
  };

  // 过滤产品名称选项
  const filterProductNameOptions = (input) => {
    const searchValue = input.toLowerCase();
    return productNameOptions.filter(option => 
      option.label.toLowerCase().includes(searchValue)
    );
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
          <Form.Item name="sku" style={{ margin: 0 }}>
            <Select
              showSearch
              placeholder={intl.formatMessage({ id: 'quotation.search.sku' })}
              style={{ width: 200 }}
              options={filterSkuOptions(skuSearchValue)}
              onSearch={setSkuSearchValue}
              filterOption={false}
              allowClear
            />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item name="product_name" style={{ margin: 0 }}>
            <Select
              showSearch
              placeholder={intl.formatMessage({ id: 'quotation.search.productName' })}
              style={{ width: 200 }}
              options={filterProductNameOptions(productNameSearchValue)}
              onSearch={setProductNameSearchValue}
              filterOption={false}
              allowClear
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
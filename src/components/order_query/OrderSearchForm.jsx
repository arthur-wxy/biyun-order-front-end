import React, { useState } from 'react';
import { Form, Input, Button, Select, DatePicker, Card, Row, Col, Space } from 'antd';
import { useIntl } from 'react-intl';
import { internalApi } from '../../network/apiClient';
import OrderTable from './OrderTable';
import { searchFields } from './constants';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;

const OrderSearchForm = () => {
    const [form] = Form.useForm();
    const intl = useIntl();
    const [loading, setLoading] = useState(false);
    const [orderData, setOrderData] = useState([]);
    const [rawOrderData, setRawOrderData] = useState([]);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 0
    });

    const transformOrderData = (apiData) => {
        return apiData.map(item => ({
            // 基础信息
            orderId: item.orderId,
            sku: item.sku,
            productName: item.productName,
            skuTic: item.skuTic,
            quantity: item.quantity,
            price: item.price,
            quotedPrice: item.quotedPrice, // 添加报价价格字段
            
            // 收货人信息
            shippingFullName: item.shippingFullName,
            address1: item.address1,
            address2: item.address2,
            city: item.city,
            state: item.state,
            country: item.country,
            zip: item.zip,
            phone: item.phone,
            email: item.email,
            shippingMethod: item.shippingMethod,
            
            // 链接和设计信息
            orderPreviewUrl: item.orderPreviewUrl,
            designUrl: item.designUrl,
            color: item.color,
            size: item.size,
            customizationUrl: item.customizationUrl,
            
            // 其他字段
            customilyUniqId: item.customilyUniqId,
            uniqField: item.uniqField,
            orderCreateTime: item.orderCreateTime,
            fulfillmentFields: item.fulfillmentFields,
            shopify: item.shopify,
            shopifyProductType: item.shopifyProductType,
            numberOfNames: item.numberOfNames,
            
            // 订单状态
            orderStatus: item.orderStatus,
            
            // 保留原有字段用于兼容性
            orderNo: item.orderNumber,
            externalOrderNo: item.externalOrderId,
            productSku: item.sku,
            amount: parseFloat(item.orderAmount),
            receiver: item.actualCustomer,
            customerPhone: item.customerPhone,
            status: item.orderStatus?.toLowerCase(),
            createTime: item.orderCreateTime,
            productImage: item.orderPreviewUrl || '/fallback-image.png'
        }));
    };

    const fetchOrders = async (params = {}) => {
        setLoading(true);
        try {
            const { dateRange, ...restParams } = params;
            const queryParams = {
                currentPage: pagination.current,
                pageSize: pagination.pageSize,
                orderId: restParams.orderId || '',
                orderNumber: restParams.orderNo || '',
                externalOrderId: restParams.externalOrderNo || '',
                sku: restParams.sku || '',
                skuTic: restParams.skuTic || '',
                productName: restParams.productName || '',
                shippingFullName: restParams.shippingFullName || '',
                orderStatus: restParams.status || '',
                startTime: dateRange?.[0]?.valueOf() || '',
                endTime: dateRange?.[1]?.valueOf() || '',
                ...restParams
            };

            // 调试信息
            console.log('Environment variables:');
            console.log('NODE_ENV:', process.env.NODE_ENV);
            console.log('REACT_APP_INTERNAL_API_URL:', process.env.REACT_APP_INTERNAL_API_URL);
            console.log('internalApi baseURL:', internalApi.defaults.baseURL);

            const response = await internalApi.get('/query.json', { params: queryParams });

            if (response.success) {
                const { content, total } = response;
                setRawOrderData(content);
                setOrderData(transformOrderData(content));
                setPagination(prev => ({
                    ...prev,
                    total
                }));
            }
        } catch (error) {
            console.error('Failed to fetch orders:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (values) => {
        setPagination(prev => ({ ...prev, current: 1 })); // 重置到第一页
        await fetchOrders(values);
    };

    const handleTableChange = (newPagination) => {
        setPagination(newPagination);
        const values = form.getFieldsValue();
        fetchOrders({
            ...values,
            currentPage: newPagination.current,
            pageSize: newPagination.pageSize
        });
    };

    const handleReset = () => {
        form.resetFields();
        setPagination(prev => ({ ...prev, current: 1 }));
        fetchOrders({});
    };

    const handleRefresh = () => {
        const values = form.getFieldsValue();
        fetchOrders(values);
    };

    const SearchField = ({ type, name, labelId, options = [] }) => {
        switch (type) {
            case 'input':
                return (
                    <Form.Item name={name} label={intl.formatMessage({ id: labelId })}>
                        <Input placeholder={intl.formatMessage({ id: labelId })} allowClear />
                    </Form.Item>
                );
            case 'select':
                return (
                    <Form.Item name={name} label={intl.formatMessage({ id: labelId })}>
                        <Select allowClear>
                            {options.map(({ label, value }) => (
                                <Select.Option key={value} value={value}>
                                    {intl.formatMessage({ id: label })}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                );
            case 'dateRange':
                return (
                    <Form.Item name={name} label={intl.formatMessage({ id: labelId })}>
                        <RangePicker 
                            style={{ width: '100%' }}
                            allowClear
                            showTime
                        />
                    </Form.Item>
                );
            default:
                return null;
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Card>
                <Form 
                    form={form}
                    onFinish={handleSubmit}
                    layout="vertical"
                >
                    <Row gutter={24}>
                        {searchFields.map((field) => (
                            <Col span={6} key={field.name}>
                                <SearchField {...field} />
                            </Col>
                        ))}
                    </Row>
                    <Row justify="end">
                        <Space>
                            <Button type="primary" htmlType="submit">
                                {intl.formatMessage({ id: 'order.search.submit' })}
                            </Button>
                            <Button onClick={handleReset}>
                                {intl.formatMessage({ id: 'order.search.reset' })}
                            </Button>
                        </Space>
                    </Row>
                </Form>
            </Card>
            
            <Card>
                <OrderTable 
                    data={orderData}
                    rawData={rawOrderData}
                    loading={loading}
                    onRefresh={handleRefresh}
                    pagination={{
                        ...pagination,
                        showSizeChanger: true,
                        showQuickJumper: true,
                        showTotal: (total) => 
                            intl.formatMessage(
                                { id: 'table.pagination.total' },
                                { total }
                            ),
                        onChange: handleTableChange
                    }}
                />
            </Card>
        </div>
    );
};

export default OrderSearchForm;
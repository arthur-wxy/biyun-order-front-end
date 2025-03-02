import React, { useState } from 'react';
import { Form, Row, Col, Space, Button, Card } from 'antd';
import { useDispatch } from 'react-redux';
import { searchFields } from './constants';
import { SearchField } from './SearchField';
import { fetchOrders } from '../../store/slices/orderSlice';
import { useSearchForm } from './hooks/useSearchForm';
import { useIntl } from 'react-intl';
import OrderTable from './OrderTable';
import { mockOrders } from '../../mock/orderData';

const OrderSearchForm = () => {
    const dispatch = useDispatch();
    const { form, expand, toggleExpand, handleReset } = useSearchForm();
    const intl = useIntl();
    const [loading, setLoading] = useState(false);
    const [orderData, setOrderData] = useState(mockOrders);

    const handleSubmit = async (values) => {
        setLoading(true);
        try {
            // 模拟API调用延迟
            await new Promise(resolve => setTimeout(resolve, 500));
            // 在实际应用中，这里会调用API获取数据
            // const response = await dispatch(fetchOrders(values));
            // setOrderData(response.payload);
            
            // 这里我们使用mock数据进行过滤
            const filteredOrders = mockOrders.filter(order => {
                if (values.orderNo && !order.orderNo.includes(values.orderNo)) {
                    return false;
                }
                if (values.status && order.status !== values.status) {
                    return false;
                }
                // 可以添加更多过滤条件
                return true;
            });
            setOrderData(filteredOrders);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Card>
                <Form form={form} onFinish={handleSubmit}>
                    <Row gutter={24}>
                        {searchFields.map((field) => (
                            <Col span={8} key={field.name}>
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
                            <Button type="link" onClick={toggleExpand}>
                                {expand ? 
                                    intl.formatMessage({ id: 'order.search.collapse' }) : 
                                    intl.formatMessage({ id: 'order.search.expand' })}
                            </Button>
                        </Space>
                    </Row>
                </Form>
            </Card>
            
            <Card>
                <OrderTable 
                    data={orderData}
                    loading={loading}
                />
            </Card>
        </div>
    );
};

export default OrderSearchForm;
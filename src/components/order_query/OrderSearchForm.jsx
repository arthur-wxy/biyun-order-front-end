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
    const [orderData, setOrderData] = useState([]);
    const [searchValues, setSearchValues] = useState(null);

    const fetchData = async (values) => {
        setLoading(true);
        try {
            const response = await dispatch(fetchOrders(values));
            if (response.payload) {
                setOrderData(response.payload);
            }
        } catch (error) {
            console.error('Search failed:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (values) => {
        setSearchValues(values);
        await fetchData(values);
    };

    const handleRefresh = () => {
        if (searchValues) {
            fetchData(searchValues);
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
                    onRefresh={handleRefresh}
                />
            </Card>
        </div>
    );
};

export default OrderSearchForm;
import React, { useCallback } from 'react';
import { Form, Row, Col, Space, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { searchFields } from './constants';
import { SearchField } from './SearchField';
import { fetchOrders } from '../../store/slices/orderSlice';
import { useSearchForm } from './hooks/useSearchForm';
import { useIntl } from 'react-intl';

const OrderSearchForm = () => {
    const dispatch = useDispatch();
    const { form, expand, toggleExpand, handleReset } = useSearchForm();
    const intl = useIntl();

    const handleSubmit = useCallback((values) => {
        dispatch(fetchOrders(values));
    }, [dispatch]);

    return (
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
                        {expand ? intl.formatMessage({ id: 'order.search.collapse' }) : intl.formatMessage({ id: 'order.search.expand' })} 
                    </Button>
                </Space>
            </Row>
        </Form>
    );
};

export default React.memo(OrderSearchForm);
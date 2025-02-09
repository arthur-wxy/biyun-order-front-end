import React, { useCallback } from 'react';
import { Form, Row, Col, Space, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { searchFields } from './constants';
import { SearchField } from './SearchField';
import { fetchOrders } from '../../store/slices/orderSlice';
import { useSearchForm } from './hooks/useSearchForm';

const OrderSearchForm = () => {
    const dispatch = useDispatch();
    const { form, expand, toggleExpand, handleReset } = useSearchForm();

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
                        搜索
                    </Button>
                    <Button onClick={handleReset}>
                        重置
                    </Button>
                    <Button type="link" onClick={toggleExpand}>
                        {expand ? '收起' : '展开'} 
                    </Button>
                </Space>
            </Row>
        </Form>
    );
};

export default React.memo(OrderSearchForm);
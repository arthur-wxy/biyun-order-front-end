import { DownOutlined } from '@ant-design/icons';
import { Col, Form, Input, DatePicker, Select, Row, Space, Button, theme } from 'antd';
import { NoFormStyle } from 'antd/es/form/context';
import React, { useState } from 'react';
import OrderTable from './OrderTable';
const OrderSearchForm = () => {
    const { token } = theme.useToken();
    const [form] = Form.useForm();
    const [expand, setExpand] = useState(false);

    const getFields = () => {
        const items = [];
        // 订单编号
        items.push(
            <Col span={8} key={0}>
                <Form.Item
                    name={`order_no`}
                    label={`订单号`}
                >
                    <Input placeholder='请输入订单号' />
                </Form.Item>
            </Col>
        );
        // 外部订单号
        items.push(
            <Col span={8} key={1}>
                <Form.Item
                    name={`external_order_no`}
                    label={`外部订单号`}
                >
                    <Input placeholder='外部订单号' />
                </Form.Item>
            </Col>
        );
        // 创建时间
        items.push(
            <Col span={8} key={2}>
                <Form.Item
                    name={`create_time`}
                    label={`创建时间`}
                >
                    <DatePicker.RangePicker />
                </Form.Item>
            </Col>
        );
        // 收件人
        items.push(
            <Col span={8} key={3}>
                <Form.Item
                    name={`receiver`}
                    label={`收件人`}
                >
                    <Input placeholder='请填写收件人' />
                </Form.Item>
            </Col>
        );
        // 商品名称
        items.push(
            <Col span={8} key={4}>
                <Form.Item
                    name={`product_name`}
                    label={`商品名称`}
                >
                    <Input placeholder='请填写商品名称' />
                </Form.Item>
            </Col>
        );
        // 收件人国家/地区
        items.push(
            <Col span={8} key={5}>
                <Form.Item
                    name={`recipient_region`}
                    label={`收件人国家/地区`}
                >
                    <Input placeholder='请输入收件人国家或地区' />
                </Form.Item>
            </Col>
        );
        // 物流方式
        items.push(
            <Col span={8} key={6}>
                <Form.Item
                    name={`logistics_method`}
                    label={`物流方式`}
                >
                    <Input placeholder='请输入物流方式' />
                </Form.Item>
            </Col>
        );
        // 订单状态
        items.push(
            <Col span={8} key={7}>
                <Form.Item
                    name={`order_status`}
                    label={`订单状态`}
                >
                    <Select
                        defaultValue="ALL"
                        options={[
                            { value: "pre_proccess", label: "待处理" },
                            { value: "done", label: "已完成" }
                        ]}
                    />
                </Form.Item>
            </Col>
        );
        return items;
    }

    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    }

    return (
        <>
            <Form form={form} name="advanced_search" style={NoFormStyle} onFinish={onFinish}>
                <Row gutter={24}>{getFields()}</Row>
                <div
                    style={{
                        textAlign: 'right',
                    }}
                >
                    <Space size="small">
                        <Button type="primary" htmlType="submit">
                            搜索
                        </Button>
                        <Button
                            onClick={() => {
                                form.resetFields();
                            }}
                        >
                            重置
                        </Button>
                        <a
                            style={{
                                fontSize: 12,
                            }}
                            onClick={() => {
                                setExpand(!expand);
                            }}
                        >
                            <DownOutlined rotate={expand ? 180 : 0} /> Collapse
                        </a>
                    </Space>
                </div>
            </Form>
            <OrderTable />
        </>
    );
}

export default OrderSearchForm;
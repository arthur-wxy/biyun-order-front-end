import React, { useEffect } from 'react';
import { Modal, Form, Input, Select, InputNumber, message, Row, Col } from 'antd';
import { useIntl } from 'react-intl';
import { internalApi } from '../../../network/apiClient';

const { TextArea } = Input;

const EditOrderModal = ({ visible, onCancel, onSuccess, initialValues }) => {
    const [form] = Form.useForm();
    const intl = useIntl();

    useEffect(() => {
        if (visible && initialValues) {
            form.setFieldsValue(initialValues);
        }
    }, [visible, initialValues, form]);

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            
            // 检查是否有字段被修改
            const hasChanged = Object.keys(values).some(
                key => values[key] !== initialValues[key]
            );

            if (!hasChanged) {
                onCancel();
                return;
            }

            // 发送更新请求
            const response = await internalApi.post('/updateSingle', {
                ...values,
                orderId: initialValues.orderId, // 保证订单ID不变
                orderNo: initialValues.orderNo // 保证订单号不变
            });

            if (response.success) {
                message.success(intl.formatMessage({ id: 'order.edit.success' }));
                onSuccess();
            } else {
                throw new Error(response.message || 'Update failed');
            }
        } catch (error) {
            message.error(error.message || intl.formatMessage({ id: 'order.edit.fail' }));
        }
    };

    return (
        <Modal
            title={intl.formatMessage({ id: 'order.edit.title' })}
            open={visible}
            onOk={handleOk}
            onCancel={onCancel}
            width={1200}
            style={{ top: 20 }}
        >
            <Form
                form={form}
                layout="vertical"
                initialValues={initialValues}
            >
                {/* 基础信息 */}
                <Row gutter={16}>
                    <Col span={8}>
                        <Form.Item
                            name="orderId"
                            label={intl.formatMessage({ id: 'order.column.orderId' })}
                        >
                            <Input disabled />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            name="orderNo"
                            label={intl.formatMessage({ id: 'table.column.orderNo' })}
                        >
                            <Input disabled />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            name="externalOrderNo"
                            label={intl.formatMessage({ id: 'table.column.externalOrderNo' })}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>

                {/* 商品信息 */}
                <Row gutter={16}>
                    <Col span={8}>
                        <Form.Item
                            name="sku"
                            label={intl.formatMessage({ id: 'order.column.sku' })}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            name="skuTic"
                            label={intl.formatMessage({ id: 'order.column.skuTic' })}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            name="productName"
                            label={intl.formatMessage({ id: 'order.column.productName' })}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={8}>
                        <Form.Item
                            name="quantity"
                            label={intl.formatMessage({ id: 'order.column.quantity' })}
                        >
                            <InputNumber style={{ width: '100%' }} min={0} />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            name="price"
                            label={intl.formatMessage({ id: 'order.column.price' })}
                        >
                            <InputNumber
                                style={{ width: '100%' }}
                                precision={2}
                                min={0}
                                prefix="¥"
                            />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            name="quotedPrice"
                            label={intl.formatMessage({ id: 'order.column.quotedPrice' })}
                        >
                            <InputNumber
                                style={{ width: '100%' }}
                                precision={2}
                                min={0}
                                prefix="¥"
                            />
                        </Form.Item>
                    </Col>
                </Row>

                {/* 商品属性 */}
                <Row gutter={16}>
                    <Col span={8}>
                        <Form.Item
                            name="color"
                            label={intl.formatMessage({ id: 'order.column.color' })}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            name="size"
                            label={intl.formatMessage({ id: 'order.column.size' })}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            name="numberOfNames"
                            label={intl.formatMessage({ id: 'order.edit.numberOfNames' })}
                        >
                            <InputNumber style={{ width: '100%' }} min={0} />
                        </Form.Item>
                    </Col>
                </Row>

                {/* 收货人信息 */}
                <Row gutter={16}>
                    <Col span={8}>
                        <Form.Item
                            name="shippingFullName"
                            label={intl.formatMessage({ id: 'order.column.shippingFullName' })}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            name="phone"
                            label={intl.formatMessage({ id: 'order.column.phone' })}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            name="email"
                            label={intl.formatMessage({ id: 'order.column.email' })}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>

                {/* 地址信息 */}
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="address1"
                            label={intl.formatMessage({ id: 'order.column.address1' })}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="address2"
                            label={intl.formatMessage({ id: 'order.column.address2' })}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={6}>
                        <Form.Item
                            name="city"
                            label={intl.formatMessage({ id: 'order.column.city' })}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item
                            name="state"
                            label={intl.formatMessage({ id: 'order.column.state' })}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item
                            name="country"
                            label={intl.formatMessage({ id: 'order.column.country' })}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item
                            name="zip"
                            label={intl.formatMessage({ id: 'order.column.zip' })}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>

                {/* 物流信息 */}
                <Row gutter={16}>
                    <Col span={8}>
                        <Form.Item
                            name="shippingMethod"
                            label={intl.formatMessage({ id: 'order.column.shippingMethod' })}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            name="orderStatus"
                            label={intl.formatMessage({ id: 'order.column.orderStatus' })}
                        >
                            <Select>
                                <Select.Option value="WAIT_QUOTATION">
                                    {intl.formatMessage({ id: 'order.status.waitQuotation' })}
                                </Select.Option>
                                <Select.Option value="QUOTED">
                                    {intl.formatMessage({ id: 'order.status.quoted' })}
                                </Select.Option>
                                <Select.Option value="CONFIRMED">
                                    {intl.formatMessage({ id: 'order.status.confirmed' })}
                                </Select.Option>
                                <Select.Option value="SHIPPED">
                                    {intl.formatMessage({ id: 'order.status.shipped' })}
                                </Select.Option>
                                <Select.Option value="DELIVERED">
                                    {intl.formatMessage({ id: 'order.status.delivered' })}
                                </Select.Option>
                                <Select.Option value="CANCELLED">
                                    {intl.formatMessage({ id: 'order.status.cancelled' })}
                                </Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            name="orderCreateTime"
                            label={intl.formatMessage({ id: 'order.column.orderCreateTime' })}
                        >
                            <Input disabled />
                        </Form.Item>
                    </Col>
                </Row>

                {/* URL链接 */}
                <Row gutter={16}>
                    <Col span={8}>
                        <Form.Item
                            name="orderPreviewUrl"
                            label={intl.formatMessage({ id: 'order.edit.orderPreviewUrl' })}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            name="designUrl"
                            label={intl.formatMessage({ id: 'order.edit.designUrl' })}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            name="customizationUrl"
                            label={intl.formatMessage({ id: 'order.edit.customizationUrl' })}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>

                {/* 其他字段 */}
                <Row gutter={16}>
                    <Col span={8}>
                        <Form.Item
                            name="customilyUniqId"
                            label={intl.formatMessage({ id: 'order.edit.customilyUniqId' })}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            name="uniqField"
                            label={intl.formatMessage({ id: 'order.edit.uniqField' })}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            name="shopify"
                            label={intl.formatMessage({ id: 'order.edit.shopify' })}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="shopifyProductType"
                            label={intl.formatMessage({ id: 'order.edit.shopifyProductType' })}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="fulfillmentFields"
                            label={intl.formatMessage({ id: 'order.edit.fulfillmentFields' })}
                        >
                            <TextArea rows={2} />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
};

export default EditOrderModal; 
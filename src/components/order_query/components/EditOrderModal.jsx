import React, { useEffect } from 'react';
import { Modal, Form, Input, Select, InputNumber, message } from 'antd';
import { useIntl } from 'react-intl';
import { useInternalApi } from '../../../network/internalApi';

const EditOrderModal = ({ visible, onCancel, onSuccess, initialValues }) => {
    const [form] = Form.useForm();
    const intl = useIntl();
    const api = useInternalApi();

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
            const response = await api.post('/updateSingle', {
                ...values,
                orderNo: initialValues.orderNo // 保证订单号不变
            });

            if (response.data?.success) {
                message.success(intl.formatMessage({ id: 'order.edit.success' }));
                onSuccess();
            } else {
                throw new Error(response.data?.message || 'Update failed');
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
            width={600}
        >
            <Form
                form={form}
                layout="vertical"
                initialValues={initialValues}
            >
                <Form.Item
                    name="orderNo"
                    label={intl.formatMessage({ id: 'table.column.orderNo' })}
                >
                    <Input disabled />
                </Form.Item>
                <Form.Item
                    name="externalOrderNo"
                    label={intl.formatMessage({ id: 'table.column.externalOrderNo' })}
                    rules={[{ required: true, message: intl.formatMessage({ id: 'order.edit.required' }) }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="productName"
                    label={intl.formatMessage({ id: 'table.column.productInfo' })}
                    rules={[{ required: true, message: intl.formatMessage({ id: 'order.edit.required' }) }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="productSku"
                    label="SKU"
                    rules={[{ required: true, message: intl.formatMessage({ id: 'order.edit.required' }) }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="amount"
                    label={intl.formatMessage({ id: 'table.column.amount' })}
                    rules={[{ required: true, message: intl.formatMessage({ id: 'order.edit.required' }) }]}
                >
                    <InputNumber
                        style={{ width: '100%' }}
                        precision={2}
                        min={0}
                        prefix="¥"
                    />
                </Form.Item>
                <Form.Item
                    name="receiver"
                    label={intl.formatMessage({ id: 'table.column.receiver' })}
                    rules={[{ required: true, message: intl.formatMessage({ id: 'order.edit.required' }) }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="phone"
                    label={intl.formatMessage({ id: 'table.column.phone' })}
                    rules={[{ required: true, message: intl.formatMessage({ id: 'order.edit.required' }) }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="status"
                    label={intl.formatMessage({ id: 'table.column.status' })}
                    rules={[{ required: true, message: intl.formatMessage({ id: 'order.edit.required' }) }]}
                >
                    <Select>
                        <Select.Option value="pending">
                            {intl.formatMessage({ id: 'order.search.status.pending' })}
                        </Select.Option>
                        <Select.Option value="completed">
                            {intl.formatMessage({ id: 'order.search.status.completed' })}
                        </Select.Option>
                        <Select.Option value="cancelled">
                            {intl.formatMessage({ id: 'order.search.status.cancelled' })}
                        </Select.Option>
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default EditOrderModal; 
import React, { useEffect } from 'react';
import { Modal, Form, Input, InputNumber, message } from 'antd';
import { useIntl } from 'react-intl';

const EditQuotationModal = ({ visible, onCancel, onSuccess, initialValues }) => {
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

            // TODO: 调用更新接口
            // const response = await api.post('/quotation/update', {
            //     ...values,
            //     sku: initialValues.sku
            // });

            // Mock successful update
            onSuccess({
                ...initialValues,
                ...values,
            });
        } catch (error) {
            message.error(intl.formatMessage({ id: 'quotation.edit.fail' }));
        }
    };

    return (
        <Modal
            title={intl.formatMessage({ id: 'quotation.edit.title' })}
            open={visible}
            onOk={handleOk}
            onCancel={onCancel}
            width={800}
        >
            <Form
                form={form}
                layout="vertical"
                initialValues={initialValues}
            >
                <Form.Item
                    name="sku"
                    label={intl.formatMessage({ id: 'quotation.column.sku' })}
                >
                    <Input disabled />
                </Form.Item>
                <Form.Item
                    name="productName"
                    label={intl.formatMessage({ id: 'quotation.column.productName' })}
                    rules={[{ required: true, message: intl.formatMessage({ id: 'form.required' }) }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="purchaseCost"
                    label={intl.formatMessage({ id: 'quotation.column.purchaseCost' })}
                    rules={[{ required: true, message: intl.formatMessage({ id: 'form.required' }) }]}
                >
                    <InputNumber
                        style={{ width: '100%' }}
                        precision={2}
                        min={0}
                        prefix="¥"
                    />
                </Form.Item>
                <Form.Item
                    name="shippingCost"
                    label={intl.formatMessage({ id: 'quotation.column.shippingCost' })}
                    rules={[{ required: true, message: intl.formatMessage({ id: 'form.required' }) }]}
                >
                    <InputNumber
                        style={{ width: '100%' }}
                        precision={2}
                        min={0}
                        prefix="¥"
                    />
                </Form.Item>
                <Form.Item
                    name="surcharge"
                    label={intl.formatMessage({ id: 'quotation.column.surcharge' })}
                    rules={[{ required: true, message: intl.formatMessage({ id: 'form.required' }) }]}
                >
                    <InputNumber
                        style={{ width: '100%' }}
                        precision={2}
                        min={0}
                        prefix="¥"
                    />
                </Form.Item>
                <Form.Item
                    name="premiumRate"
                    label={intl.formatMessage({ id: 'quotation.column.premiumRate' })}
                    rules={[{ required: true, message: intl.formatMessage({ id: 'form.required' }) }]}
                >
                    <InputNumber
                        style={{ width: '100%' }}
                        precision={2}
                        min={0}
                        max={100}
                        suffix="%"
                    />
                </Form.Item>
                <Form.Item
                    name="exchangeRate"
                    label={intl.formatMessage({ id: 'quotation.column.exchangeRate' })}
                    rules={[{ required: true, message: intl.formatMessage({ id: 'form.required' }) }]}
                >
                    <InputNumber
                        style={{ width: '100%' }}
                        precision={4}
                        min={0}
                    />
                </Form.Item>
                <Form.Item
                    name="grossProfit"
                    label={intl.formatMessage({ id: 'quotation.column.grossProfit' })}
                    rules={[{ required: true, message: intl.formatMessage({ id: 'form.required' }) }]}
                >
                    <InputNumber
                        style={{ width: '100%' }}
                        precision={2}
                        prefix="¥"
                        disabled
                    />
                </Form.Item>
                <Form.Item
                    name="grossProfitRate"
                    label={intl.formatMessage({ id: 'quotation.column.grossProfitRate' })}
                    rules={[{ required: true, message: intl.formatMessage({ id: 'form.required' }) }]}
                >
                    <InputNumber
                        style={{ width: '100%' }}
                        precision={2}
                        suffix="%"
                        disabled
                    />
                </Form.Item>
                <Form.Item
                    name="actualWeight"
                    label={intl.formatMessage({ id: 'quotation.column.actualWeight' })}
                    rules={[{ required: true, message: intl.formatMessage({ id: 'form.required' }) }]}
                >
                    <InputNumber
                        style={{ width: '100%' }}
                        precision={2}
                        min={0}
                        suffix="kg"
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default EditQuotationModal; 
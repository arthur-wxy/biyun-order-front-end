import React from 'react';
import { Modal, Form, Input, InputNumber, message } from 'antd';
import { useIntl } from 'react-intl';

const AddQuotationModal = ({ visible, onCancel, onSuccess }) => {
    const [form] = Form.useForm();
    const intl = useIntl();

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            
            // TODO: 调用插入接口
            // const response = await api.post('/quotation/add', values);
            
            // Mock successful insertion
            const newQuotation = {
                ...values,
                sku: `SKU${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
                gross_profit: calculateGrossProfit(values),
                gross_profit_rate: calculateGrossProfitRate(values)
            };
            
            onSuccess(newQuotation);
            form.resetFields();
        } catch (error) {
            if (error.errorFields) {
                // 表单验证错误
                message.error(intl.formatMessage({ id: 'form.validation.fail' }));
            } else {
                // API 调用错误
                message.error(intl.formatMessage({ id: 'quotation.add.fail' }));
            }
        }
    };

    // 计算毛利
    const calculateGrossProfit = (values) => {
        const { purchase_cost, shipping_cost, surcharge, premium_rate, exchange_rate } = values;
        const totalCost = purchase_cost + shipping_cost + surcharge;
        const sellingPrice = totalCost * (1 + premium_rate / 100) * exchange_rate;
        return sellingPrice - totalCost;
    };

    // 计算毛利润率
    const calculateGrossProfitRate = (values) => {
        const { purchase_cost, shipping_cost, surcharge, premium_rate, exchange_rate } = values;
        const totalCost = purchase_cost + shipping_cost + surcharge;
        const sellingPrice = totalCost * (1 + premium_rate / 100) * exchange_rate;
        return ((sellingPrice - totalCost) / sellingPrice) * 100;
    };

    return (
        <Modal
            title={intl.formatMessage({ id: 'quotation.add.title' })}
            open={visible}
            onOk={handleOk}
            onCancel={onCancel}
            width={800}
        >
            <Form
                form={form}
                layout="vertical"
            >
                <Form.Item
                    name="sku"
                    label={intl.formatMessage({ id: 'quotation.column.sku' })}
                    rules={[{ required: true, message: intl.formatMessage({ id: 'form.required' }) }]}
                >
                    <Input placeholder={intl.formatMessage({ id: 'quotation.sku.placeholder' })} />
                </Form.Item>
                <Form.Item
                    name="product_name"
                    label={intl.formatMessage({ id: 'quotation.column.productName' })}
                    rules={[{ required: true, message: intl.formatMessage({ id: 'form.required' }) }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="purchase_cost"
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
                    name="shipping_cost"
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
                    name="premium_rate"
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
                    name="exchange_rate"
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
                    name="actual_weight"
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

export default AddQuotationModal; 
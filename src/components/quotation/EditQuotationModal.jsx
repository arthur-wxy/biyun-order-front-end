import React, { useEffect } from 'react';
import { Modal, Form, Input, InputNumber, Button, Space, message, Typography } from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { useIntl } from 'react-intl';

const { Title } = Typography;

const EditQuotationModal = ({ visible, initialValues, onCancel, onSuccess }) => {
    const [form] = Form.useForm();
    const intl = useIntl();

    useEffect(() => {
        if (visible && initialValues) {
            form.setFieldsValue({
                ...initialValues,
                quotationConfigVOList: initialValues.quotationConfigVOList || []
            });
        }
    }, [visible, initialValues, form]);

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            onSuccess(values);
        } catch (error) {
            message.error(intl.formatMessage({ id: 'quotation.edit.fail' }));
        }
    };

    // 数字校验规则
    const numberRules = [
        { required: true, message: intl.formatMessage({ id: 'form.required' }) },
        {
            validator: (_, value) => {
                if (value === undefined || value === null || value === '') {
                    return Promise.resolve();
                }
                if (isNaN(Number(value))) {
                    return Promise.reject(intl.formatMessage({ id: 'form.number.required' }));
                }
                return Promise.resolve();
            }
        }
    ];

    // 非必填数字校验规则
    const optionalNumberRules = [
        {
            validator: (_, value) => {
                if (value === undefined || value === null || value === '') {
                    return Promise.resolve();
                }
                if (isNaN(Number(value))) {
                    return Promise.reject(intl.formatMessage({ id: 'form.number.required' }));
                }
                return Promise.resolve();
            }
        }
    ];

    return (
        <Modal
            title={intl.formatMessage({ id: 'quotation.edit.title' })}
            open={visible}
            onCancel={onCancel}
            onOk={handleSubmit}
            width={1000}
        >
            <Form
                form={form}
                layout="vertical"
                initialValues={initialValues}
            >
                <Form.Item
                    name="sku"
                    label={intl.formatMessage({ id: 'quotation.column.sku' })}
                    rules={[{ required: true, message: intl.formatMessage({ id: 'form.required' }) }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="productName"
                    label={intl.formatMessage({ id: 'quotation.column.productName' })}
                    rules={[{ required: true, message: intl.formatMessage({ id: 'form.required' }) }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="regionCode"
                    label={intl.formatMessage({ id: 'quotation.column.regionCode' })}
                    rules={[{ required: true, message: intl.formatMessage({ id: 'form.required' }) }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="productPrice"
                    label={intl.formatMessage({ id: 'quotation.column.productPrice' })}
                    rules={numberRules}
                >
                    <InputNumber
                        style={{ width: '100%' }}
                        formatter={value => `¥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={value => value.replace(/\¥\s?|(,*)/g, '')}
                        precision={2}
                    />
                </Form.Item>

                <Form.Item
                    name="shippingCost"
                    label={intl.formatMessage({ id: 'quotation.column.shippingCost' })}
                    rules={numberRules}
                >
                    <InputNumber
                        style={{ width: '100%' }}
                        formatter={value => `¥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={value => value.replace(/\¥\s?|(,*)/g, '')}
                        precision={2}
                    />
                </Form.Item>

                <Form.Item
                    name="estimatedProcessingTime"
                    label={intl.formatMessage({ id: 'quotation.column.estimatedProcessingTime' })}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="shippingLine"
                    label={intl.formatMessage({ id: 'quotation.column.shippingLine' })}
                    rules={[{ required: true, message: intl.formatMessage({ id: 'form.required' }) }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="shippingTimeDesc"
                    label={intl.formatMessage({ id: 'quotation.column.shippingTimeDesc' })}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="currency"
                    label={intl.formatMessage({ id: 'quotation.column.currency' })}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="actualWeight"
                    label={intl.formatMessage({ id: 'quotation.column.actualWeight' })}
                    rules={optionalNumberRules}
                >
                    <InputNumber
                        style={{ width: '100%' }}
                        formatter={value => `${value} kg`}
                        parser={value => value.replace(' kg', '')}
                        precision={2}
                    />
                </Form.Item>

                <Title level={5} style={{ marginTop: 24, marginBottom: 16 }}>
                    {intl.formatMessage({ id: 'quotation.config.title' })}
                </Title>

                <Form.List name="quotationConfigVOList">
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name, ...restField }) => (
                                <div key={key} style={{ border: '1px solid #d9d9d9', padding: '16px', marginBottom: '16px', borderRadius: '4px' }}>
                                    <div style={{ overflowX: 'auto' }}>
                                        <Space style={{ display: 'flex', marginBottom: 8, whiteSpace: 'nowrap' }} align="baseline">
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'regionCode']}
                                                label={intl.formatMessage({ id: 'quotation.column.regionCode' })}
                                                rules={[{ required: true, message: intl.formatMessage({ id: 'form.required' }) }]}
                                            >
                                                <Input />
                                            </Form.Item>

                                            <Form.Item
                                                {...restField}
                                                name={[name, 'purchaseCost']}
                                                label={intl.formatMessage({ id: 'quotation.column.purchaseCost' })}
                                                rules={numberRules}
                                            >
                                                <InputNumber
                                                    style={{ width: '100%' }}
                                                    formatter={value => `¥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                    parser={value => value.replace(/\¥\s?|(,*)/g, '')}
                                                    precision={2}
                                                />
                                            </Form.Item>

                                            <Form.Item
                                                {...restField}
                                                name={[name, 'shippingCost']}
                                                label={intl.formatMessage({ id: 'quotation.column.shippingCost' })}
                                                rules={numberRules}
                                            >
                                                <InputNumber
                                                    style={{ width: '100%' }}
                                                    formatter={value => `¥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                    parser={value => value.replace(/\¥\s?|(,*)/g, '')}
                                                    precision={2}
                                                />
                                            </Form.Item>

                                            <Form.Item
                                                {...restField}
                                                name={[name, 'surcharge']}
                                                label={intl.formatMessage({ id: 'quotation.column.surcharge' })}
                                                rules={optionalNumberRules}
                                            >
                                                <InputNumber
                                                    style={{ width: '100%' }}
                                                    formatter={value => `¥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                    parser={value => value.replace(/\¥\s?|(,*)/g, '')}
                                                    precision={2}
                                                />
                                            </Form.Item>

                                            <Form.Item
                                                {...restField}
                                                name={[name, 'premiumRate']}
                                                label={intl.formatMessage({ id: 'quotation.column.premiumRate' })}
                                                rules={optionalNumberRules}
                                            >
                                                <InputNumber
                                                    style={{ width: '100%' }}
                                                    formatter={value => `${value}%`}
                                                    parser={value => value.replace('%', '')}
                                                    precision={2}
                                                />
                                            </Form.Item>

                                            <Form.Item
                                                {...restField}
                                                name={[name, 'exchangeRate']}
                                                label={intl.formatMessage({ id: 'quotation.column.exchangeRate' })}
                                                rules={optionalNumberRules}
                                            >
                                                <InputNumber
                                                    style={{ width: '100%' }}
                                                    precision={4}
                                                />
                                            </Form.Item>

                                            <Form.Item
                                                {...restField}
                                                name={[name, 'grossProfit']}
                                                label={intl.formatMessage({ id: 'quotation.column.grossProfit' })}
                                                rules={optionalNumberRules}
                                            >
                                                <InputNumber
                                                    style={{ width: '100%' }}
                                                    formatter={value => `¥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                    parser={value => value.replace(/\¥\s?|(,*)/g, '')}
                                                    precision={2}
                                                />
                                            </Form.Item>

                                            <Form.Item
                                                {...restField}
                                                name={[name, 'grossProfitRate']}
                                                label={intl.formatMessage({ id: 'quotation.column.grossProfitRate' })}
                                                rules={optionalNumberRules}
                                            >
                                                <InputNumber
                                                    style={{ width: '100%' }}
                                                    formatter={value => `${value}%`}
                                                    parser={value => value.replace('%', '')}
                                                    precision={2}
                                                />
                                            </Form.Item>

                                            <Form.Item
                                                {...restField}
                                                name={[name, 'actualWeight']}
                                                label={intl.formatMessage({ id: 'quotation.column.actualWeight' })}
                                                rules={optionalNumberRules}
                                            >
                                                <InputNumber
                                                    style={{ width: '100%' }}
                                                    formatter={value => `${value} kg`}
                                                    parser={value => value.replace(' kg', '')}
                                                    precision={2}
                                                />
                                            </Form.Item>

                                            <Form.Item
                                                {...restField}
                                                name={[name, 'remark']}
                                                label={intl.formatMessage({ id: 'quotation.column.remark' })}
                                            >
                                                <Input />
                                            </Form.Item>

                                            <MinusCircleOutlined onClick={() => remove(name)} style={{ marginLeft: 8 }} />
                                        </Space>
                                    </div>
                                </div>
                            ))}
                            <Form.Item>
                                <Button
                                    type="dashed"
                                    onClick={() => add()}
                                    block
                                    icon={<PlusOutlined />}
                                >
                                    {intl.formatMessage({ id: 'quotation.add.button' })}
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>
            </Form>
        </Modal>
    );
};

export default EditQuotationModal; 
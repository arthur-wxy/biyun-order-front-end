import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, InputNumber, Button, Space, message, Typography, Row, Col } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { useIntl } from 'react-intl';

const EditQuotationModal = ({ visible, initialValues, isAddMode, onCancel, onSuccess }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const intl = useIntl();

    useEffect(() => {
        console.log('EditQuotationModal useEffect triggered:', {
            visible,
            initialValues,
            isAddMode,
            hasQuotationConfigVOList: initialValues?.quotationConfigVOList?.length > 0
        });

        if (visible && initialValues) {
            const formValues = {
                ...initialValues,
                quotationConfigVOList: Array.isArray(initialValues.quotationConfigVOList) 
                    ? initialValues.quotationConfigVOList.map(config => ({
                        ...config,
                        premiumRate: config.premiumRate ? config.premiumRate * 100 : undefined,
                        grossProfitRate: config.grossProfitRate ? config.grossProfitRate * 100 : undefined
                    }))
                    : []
            };
            console.log('Setting form values:', formValues);
            form.setFieldsValue(formValues);
        } else {
            console.log('Resetting form');
            form.resetFields();
        }
    }, [visible, initialValues, form, isAddMode]);

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const values = await form.validateFields();
            console.log('Form submitted with values:', values);

            // 转换溢价率和毛利润率为小数形式
            if (values.quotationConfigVOList) {
                values.quotationConfigVOList = values.quotationConfigVOList.map(config => ({
                    ...config,
                    premiumRate: config.premiumRate ? config.premiumRate / 100 : undefined,
                    grossProfitRate: config.grossProfitRate ? config.grossProfitRate / 100 : undefined
                }));
            }

            await onSuccess(values);
            message.success(intl.formatMessage({ id: isAddMode ? 'quotation.add.success' : 'quotation.edit.success' }));
            onCancel();
        } catch (error) {
            console.error('Form submission error:', error);
            message.error(intl.formatMessage({ id: isAddMode ? 'quotation.add.fail' : 'quotation.edit.fail' }));
        } finally {
            setLoading(false);
        }
    };

    // 数字校验规则（必填）
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

    // 数字校验规则（非必填）
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

    // 必填字段校验规则
    const requiredRule = [{ required: true, message: intl.formatMessage({ id: 'form.required' }) }];

    return (
        <Modal
            title={intl.formatMessage({ id: isAddMode ? 'quotation.add.title' : 'quotation.edit.title' })}
            open={visible}
            onCancel={onCancel}
            width={1200}
            footer={null}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                initialValues={initialValues}
            >
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="sku"
                            label={intl.formatMessage({ id: 'quotation.column.sku' })}
                            rules={requiredRule}
                        >
                            <Input disabled={!isAddMode} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="productName"
                            label={intl.formatMessage({ id: 'quotation.column.productName' })}
                            rules={requiredRule}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="actualWeight"
                            label={intl.formatMessage({ id: 'quotation.column.actualWeight' })}
                            rules={numberRules}
                        >
                            <InputNumber
                                style={{ width: '100%' }}
                                min={0}
                                step={0.01}
                                precision={2}
                                addonAfter="kg"
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Typography.Title level={5} style={{ marginTop: 24, marginBottom: 16, whiteSpace: 'nowrap' }}>
                    {intl.formatMessage({ id: 'quotation.config.title' })}
                </Typography.Title>

                <div style={{ overflowX: 'auto' }}>
                    <Form.List name="quotationConfigVOList">
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map(({ key, name, ...restField }) => (
                                    <div key={key} style={{ 
                                        border: '1px solid #f0f0f0', 
                                        padding: '16px', 
                                        marginBottom: '16px',
                                        borderRadius: '4px',
                                        minWidth: '1100px'
                                    }}>
                                        <Row gutter={[16, 16]}>
                                            <Col span={8}>
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, 'regionCode']}
                                                    label={intl.formatMessage({ id: 'quotation.column.regionCode' })}
                                                    rules={requiredRule}
                                                >
                                                    <Input />
                                                </Form.Item>
                                            </Col>
                                            <Col span={8}>
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, 'productPrice']}
                                                    label={intl.formatMessage({ id: 'quotation.column.productPrice' })}
                                                    rules={optionalNumberRules}
                                                >
                                                    <InputNumber
                                                        style={{ width: '100%' }}
                                                        min={0}
                                                        step={0.01}
                                                        precision={2}
                                                        prefix="¥"
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col span={8}>
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, 'purchaseCost']}
                                                    label={intl.formatMessage({ id: 'quotation.column.purchaseCost' })}
                                                    rules={numberRules}
                                                >
                                                    <InputNumber
                                                        style={{ width: '100%' }}
                                                        min={0}
                                                        step={0.01}
                                                        precision={2}
                                                        prefix="¥"
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col span={8}>
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, 'shippingCost']}
                                                    label={intl.formatMessage({ id: 'quotation.column.shippingCost' })}
                                                    rules={numberRules}
                                                >
                                                    <InputNumber
                                                        style={{ width: '100%' }}
                                                        min={0}
                                                        step={0.01}
                                                        precision={2}
                                                        prefix="¥"
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col span={8}>
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, 'surcharge']}
                                                    label={intl.formatMessage({ id: 'quotation.column.surcharge' })}
                                                    rules={numberRules}
                                                >
                                                    <InputNumber
                                                        style={{ width: '100%' }}
                                                        min={0}
                                                        step={0.01}
                                                        precision={2}
                                                        prefix="¥"
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col span={8}>
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, 'premiumRate']}
                                                    label={intl.formatMessage({ id: 'quotation.column.premiumRate' })}
                                                    rules={numberRules}
                                                >
                                                    <InputNumber
                                                        style={{ width: '100%' }}
                                                        min={0}
                                                        step={0.01}
                                                        precision={2}
                                                        addonAfter="%"
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col span={8}>
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, 'exchangeRate']}
                                                    label={intl.formatMessage({ id: 'quotation.column.exchangeRate' })}
                                                    rules={numberRules}
                                                >
                                                    <InputNumber
                                                        style={{ width: '100%' }}
                                                        min={0}
                                                        step={0.0001}
                                                        precision={4}
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col span={8}>
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, 'grossProfit']}
                                                    label={intl.formatMessage({ id: 'quotation.column.grossProfit' })}
                                                    rules={optionalNumberRules}
                                                >
                                                    <InputNumber
                                                        style={{ width: '100%' }}
                                                        min={0}
                                                        step={0.01}
                                                        precision={2}
                                                        prefix="¥"
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col span={8}>
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, 'grossProfitRate']}
                                                    label={intl.formatMessage({ id: 'quotation.column.grossProfitRate' })}
                                                    rules={optionalNumberRules}
                                                >
                                                    <InputNumber
                                                        style={{ width: '100%' }}
                                                        min={0}
                                                        step={0.01}
                                                        precision={2}
                                                        addonAfter="%"
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col span={8}>
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, 'currency']}
                                                    label={intl.formatMessage({ id: 'quotation.column.currency' })}
                                                    rules={requiredRule}
                                                >
                                                    <Input />
                                                </Form.Item>
                                            </Col>
                                            <Col span={8}>
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, 'estimatedProcessingTime']}
                                                    label={intl.formatMessage({ id: 'quotation.column.estimatedProcessingTime' })}
                                                >
                                                    <Input />
                                                </Form.Item>
                                            </Col>
                                            <Col span={8}>
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, 'shippingLine']}
                                                    label={intl.formatMessage({ id: 'quotation.column.shippingLine' })}
                                                >
                                                    <Input />
                                                </Form.Item>
                                            </Col>
                                            <Col span={8}>
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, 'shippingTimeDesc']}
                                                    label={intl.formatMessage({ id: 'quotation.column.shippingTimeDesc' })}
                                                    rules={requiredRule}
                                                >
                                                    <Input />
                                                </Form.Item>
                                            </Col>
                                            <Col span={8}>
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, 'shippingFees']}
                                                    label={intl.formatMessage({ id: 'quotation.column.shippingFees' })}
                                                    rules={optionalNumberRules}
                                                >
                                                    <InputNumber
                                                        style={{ width: '100%' }}
                                                        min={0}
                                                        step={0.01}
                                                        precision={2}
                                                        prefix="¥"
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col span={8}>
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, 'totalCost']}
                                                    label={intl.formatMessage({ id: 'quotation.column.totalCost' })}
                                                >
                                                    <InputNumber
                                                        style={{ width: '100%' }}
                                                        min={0}
                                                        step={0.01}
                                                        precision={2}
                                                        prefix="¥"
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col span={24}>
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, 'remark']}
                                                    label={intl.formatMessage({ id: 'quotation.column.remark' })}
                                                >
                                                    <Input.TextArea rows={2} />
                                                </Form.Item>
                                            </Col>
                                        </Row>

                                        <Button
                                            type="link"
                                            danger
                                            icon={<DeleteOutlined />}
                                            onClick={() => remove(name)}
                                            style={{ marginTop: 8 }}
                                        >
                                            {intl.formatMessage({ id: 'quotation.config.remove' })}
                                        </Button>
                                    </div>
                                ))}

                                <Form.Item>
                                    <Button
                                        type="dashed"
                                        onClick={() => add()}
                                        block
                                        icon={<PlusOutlined />}
                                    >
                                        {intl.formatMessage({ id: 'quotation.config.add' })}
                                    </Button>
                                </Form.Item>
                            </>
                        )}
                    </Form.List>
                </div>

                <Form.Item style={{ marginTop: 24, textAlign: 'right' }}>
                    <Space>
                        <Button onClick={onCancel}>
                            {intl.formatMessage({ id: 'common.cancel' })}
                        </Button>
                        <Button type="primary" htmlType="submit" loading={loading}>
                            {intl.formatMessage({ id: isAddMode ? 'common.add' : 'common.save' })}
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default EditQuotationModal; 
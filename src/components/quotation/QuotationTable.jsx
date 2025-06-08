import React, { useState, useEffect } from 'react';
import { Table, Button, Space, Popconfirm, message, Alert } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { useIntl } from 'react-intl';
import EditQuotationModal from './EditQuotationModal';
import QuotationSearchForm from './QuotationSearchForm';
import { internalApi } from '../../network/apiClient';
import { mockQuotations } from './mockData';

const QuotationTable = () => {
    const intl = useIntl();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [currentRecord, setCurrentRecord] = useState(null);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [isAddMode, setIsAddMode] = useState(false);

    // 初始加载数据
    useEffect(() => {
        fetchQuotations();
    }, []);

    // 获取报价单数据
    const fetchQuotations = async (params = {}) => {
        setLoading(true);
        try {
            // 调用后端接口获取数据
            const response = await internalApi.get('/quotationManagement/queryQuotationByParam.json', {
                params: {
                    quotation_id: params.quotation_id || 0,
                    sku: params.sku || '',
                    product_name: params.product_name || '',
                    region_code: params.region_code || ''
                }
            });

            if (response.success) {
                setData(response.content || []);
            } else {
                // 如果接口调用失败，使用模拟数据
                console.warn('API call failed, using mock data');
                setData(mockQuotations);
            }
        } catch (error) {
            console.error('Failed to fetch quotations:', error);
            // 出错时使用模拟数据
            setData(mockQuotations);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (record) => {
        console.log('handleEdit record:', record);
        setCurrentRecord(record);
        setIsAddMode(false);
        setEditModalVisible(true);
    };

    const handleAdd = () => {
        setCurrentRecord(null);
        setIsAddMode(true);
        setEditModalVisible(true);
    };

    const handleDelete = async (record) => {
        try {
            setLoading(true);
            // TODO: 调用删除接口
            // const response = await api.post('/quotation/delete', { sku: record.sku });
            
            // Mock successful deletion
            setData(data.filter(item => item.sku !== record.sku));
            message.success(intl.formatMessage({ id: 'quotation.delete.success' }));
        } catch (error) {
            message.error(intl.formatMessage({ id: 'quotation.delete.fail' }));
        } finally {
            setLoading(false);
        }
    };

    const handleBatchDelete = async () => {
        try {
            setLoading(true);
            // TODO: 调用批量删除接口
            // const response = await api.post('/quotation/batchDelete', { skus: selectedRowKeys });
            
            // Mock successful batch deletion
            setData(data.filter(item => !selectedRowKeys.includes(item.sku)));
            setSelectedRowKeys([]);
            message.success(intl.formatMessage({ id: 'quotation.batchDelete.success' }));
        } catch (error) {
            message.error(intl.formatMessage({ id: 'quotation.batchDelete.fail' }));
        } finally {
            setLoading(false);
        }
    };

    const handleEditSuccess = async (updatedRecord) => {
        try {
            setLoading(true);
            
            if (isAddMode) {
                // 创建新报价单
                const response = await internalApi.post('/quotationManagement/createQuotation.json', updatedRecord);
                
                if (response.success) {
                    setData([...data, response.content]);
                    setEditModalVisible(false);
                    setCurrentRecord(null);
                    message.success(intl.formatMessage({ id: 'quotation.add.success' }));
                } else {
                    message.error(response.message || intl.formatMessage({ id: 'quotation.add.fail' }));
                }
            } else {
                // 更新现有报价单
                const currentQuotation = data.find(item => item.sku === updatedRecord.sku);
                if (!currentQuotation) {
                    message.error(intl.formatMessage({ id: 'quotation.edit.fail' }));
                    return;
                }

                const params = {
                    quotationId: currentQuotation.quotationId,
                    sku: updatedRecord.sku,
                    productName: updatedRecord.productName,
                    regionCode: updatedRecord.regionCode,
                    productPrice: updatedRecord.productPrice,
                    shippingCost: updatedRecord.shippingCost,
                    estimatedProcessingTime: updatedRecord.estimatedProcessingTime,
                    shippingLine: updatedRecord.shippingLine,
                    shippingTimeDesc: updatedRecord.shippingTimeDesc,
                    currency: updatedRecord.currency,
                    actualWeight: updatedRecord.actualWeight,
                    quotationConfigVOList: updatedRecord.quotationConfigVOList
                };

                params.quotationConfigVOList.forEach(item => {
                    item.quotationId = currentQuotation.quotationId;
                });

                const response = await internalApi.post('/quotationManagement/updateQuotation.json', params);

                if (response.success) {
                    setData(data.map(item => 
                        item.quotationId === currentQuotation.quotationId ? { ...item, ...updatedRecord } : item
                    ));
                    setEditModalVisible(false);
                    setCurrentRecord(null);
                    message.success(intl.formatMessage({ id: 'quotation.edit.success' }));
                } else {
                    message.error(response.message || intl.formatMessage({ id: 'quotation.edit.fail' }));
                }
            }
        } catch (error) {
            console.error('Failed to update quotation:', error);
            message.error(intl.formatMessage({ id: isAddMode ? 'quotation.add.fail' : 'quotation.edit.fail' }));
        } finally {
            setLoading(false);
        }
    };

    // 处理搜索
    const handleSearch = (values) => {
        fetchQuotations(values);
    };

    // 子表格列配置
    const expandedRowRender = (record) => {
        const columns = [
            {
                title: intl.formatMessage({ id: 'quotation.column.regionCode' }),
                dataIndex: 'regionCode',
                key: 'regionCode',
                width: 100,
                fixed: 'left',
            },
            {
                title: intl.formatMessage({ id: 'quotation.column.purchaseCost' }),
                dataIndex: 'purchaseCost',
                key: 'purchaseCost',
                width: 120,
                align: 'right',
                render: (value) => `¥${Number(value).toFixed(2)}`,
            },
            {
                title: intl.formatMessage({ id: 'quotation.column.shippingCost' }),
                dataIndex: 'shippingCost',
                key: 'shippingCost',
                width: 120,
                align: 'right',
                render: (value) => `¥${Number(value).toFixed(2)}`,
            },
            {
                title: intl.formatMessage({ id: 'quotation.column.surcharge' }),
                dataIndex: 'surcharge',
                key: 'surcharge',
                width: 120,
                align: 'right',
                render: (value) => `¥${Number(value).toFixed(2)}`,
            },
            {
                title: intl.formatMessage({ id: 'quotation.column.premiumRate' }),
                dataIndex: 'premiumRate',
                key: 'premiumRate',
                width: 120,
                align: 'right',
                render: (value) => `${Number(value).toFixed(2)}%`,
            },
            {
                title: intl.formatMessage({ id: 'quotation.column.exchangeRate' }),
                dataIndex: 'exchangeRate',
                key: 'exchangeRate',
                width: 120,
                align: 'right',
                render: (value) => Number(value).toFixed(4),
            },
            {
                title: intl.formatMessage({ id: 'quotation.column.grossProfit' }),
                dataIndex: 'grossProfit',
                key: 'grossProfit',
                width: 120,
                align: 'right',
                render: (value) => `¥${Number(value).toFixed(2)}`,
            },
            {
                title: intl.formatMessage({ id: 'quotation.column.grossProfitRate' }),
                dataIndex: 'grossProfitRate',
                key: 'grossProfitRate',
                width: 120,
                align: 'right',
                render: (value) => `${Number(value).toFixed(2)}%`,
            },
            {
                title: intl.formatMessage({ id: 'quotation.column.currency' }),
                dataIndex: 'currency',
                key: 'currency',
                width: 100,
            },
            {
                title: intl.formatMessage({ id: 'quotation.column.estimatedProcessingTime' }),
                dataIndex: 'estimatedProcessingTime',
                key: 'estimatedProcessingTime',
                width: 120,
            },
            {
                title: intl.formatMessage({ id: 'quotation.column.shippingLine' }),
                dataIndex: 'shippingLine',
                key: 'shippingLine',
                width: 150,
            },
            {
                title: intl.formatMessage({ id: 'quotation.column.shippingTimeDesc' }),
                dataIndex: 'shippingTimeDesc',
                key: 'shippingTimeDesc',
                width: 150,
            },
            {
                title: intl.formatMessage({ id: 'quotation.column.shippingFees' }),
                dataIndex: 'shippingFees',
                key: 'shippingFees',
                width: 120,
                align: 'right',
                render: (value) => `¥${Number(value).toFixed(2)}`,
            },
            {
                title: intl.formatMessage({ id: 'quotation.column.totalCost' }),
                dataIndex: 'totalCost',
                key: 'totalCost',
                width: 120,
                align: 'right',
                render: (value) => `¥${Number(value).toFixed(2)}`,
            },
            {
                title: intl.formatMessage({ id: 'quotation.column.remark' }),
                dataIndex: 'remark',
                key: 'remark',
                width: 200,
            },
        ];

        return (
            <div style={{ overflowX: 'auto' }}>
                <Table
                    columns={columns}
                    dataSource={record.quotationConfigVOList}
                    pagination={false}
                    rowKey="id"
                    scroll={{ x: 2000 }}
                    size="small"
                />
            </div>
        );
    };

    const columns = [
        {
            title: intl.formatMessage({ id: 'quotation.column.sku' }),
            dataIndex: 'sku',
            key: 'sku',
            width: 150,
        },
        {
            title: intl.formatMessage({ id: 'quotation.column.productName' }),
            dataIndex: 'productName',
            key: 'productName',
            width: 200,
        },
        {
            title: intl.formatMessage({ id: 'quotation.column.actualWeight' }),
            dataIndex: 'actualWeight',
            key: 'actualWeight',
            width: 120,
            align: 'right',
            render: (value) => value ? `${Number(value).toFixed(2)}kg` : '-',
        },
        {
            title: intl.formatMessage({ id: 'table.column.operation' }),
            key: 'operation',
            fixed: 'right',
            width: 120,
            render: (_, record) => (
                <Space>
                    <Button
                        type="link"
                        icon={<EditOutlined />}
                        onClick={() => handleEdit(record)}
                    >
                        {intl.formatMessage({ id: 'table.operation.edit' })}
                    </Button>
                </Space>
            ),
        },
    ];

    const rowSelection = {
        selectedRowKeys,
        onChange: setSelectedRowKeys,
    };

    return (
        <>
            <div style={{ marginBottom: 16 }}>
                <QuotationSearchForm onSearch={handleSearch} loading={loading} />
            </div>

            <div style={{ marginBottom: 16 }}>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={handleAdd}
                >
                    {intl.formatMessage({ id: 'quotation.add.button' })}
                </Button>
            </div>

            {selectedRowKeys.length > 0 && (
                <Alert
                    message={
                        <Space>
                            {intl.formatMessage(
                                { id: 'table.selected.count' },
                                { count: selectedRowKeys.length }
                            )}
                            <Popconfirm
                                title={intl.formatMessage({ id: 'quotation.batchDelete.confirm' })}
                                onConfirm={handleBatchDelete}
                                okText={intl.formatMessage({ id: 'common.yes' })}
                                cancelText={intl.formatMessage({ id: 'common.no' })}
                            >
                                <Button
                                    type="link"
                                    danger
                                    icon={<DeleteOutlined />}
                                >
                                    {intl.formatMessage({ id: 'table.operation.batchDelete' })}
                                </Button>
                            </Popconfirm>
                        </Space>
                    }
                    type="info"
                    showIcon
                    style={{ marginBottom: 16 }}
                />
            )}

            <Table
                rowSelection={rowSelection}
                columns={columns}
                dataSource={data}
                loading={loading}
                rowKey="quotationId"
                expandable={{
                    expandedRowRender,
                    rowExpandable: record => record.quotationConfigVOList && record.quotationConfigVOList.length > 0,
                }}
                pagination={{
                    showSizeChanger: true,
                    showQuickJumper: true,
                    showTotal: (total) => 
                        intl.formatMessage(
                            { id: 'table.pagination.total' },
                            { total }
                        ),
                }}
                scroll={{ x: 'max-content' }}
            />

            <EditQuotationModal
                visible={editModalVisible}
                initialValues={currentRecord}
                isAddMode={isAddMode}
                onCancel={() => {
                    setEditModalVisible(false);
                    setCurrentRecord(null);
                    setIsAddMode(false);
                }}
                onSuccess={handleEditSuccess}
            />
        </>
    );
};

export default QuotationTable; 
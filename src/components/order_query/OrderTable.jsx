import React, { useState } from 'react';
import { Table, message, Alert, Button, Popconfirm, Space } from 'antd';
import { useIntl } from 'react-intl';
import { getOrderColumns } from './config/tableColumns';
import EditOrderModal from './components/EditOrderModal';
import { internalApi } from '../../network/apiClient';
import { DeleteOutlined, DownloadOutlined } from '@ant-design/icons';
import * as XLSX from 'xlsx';

const OrderTable = ({ data, rawData, loading, onRefresh }) => {
    const intl = useIntl();
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [currentRecord, setCurrentRecord] = useState(null);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [isSelectAll, setIsSelectAll] = useState(false);

    const handleEdit = (record) => {
        setCurrentRecord(record);
        setEditModalVisible(true);
    };

    const handleEditSuccess = () => {
        setEditModalVisible(false);
        setCurrentRecord(null);
        onRefresh();
    };

    const handleDelete = async (record) => {
        try {
            const response = await internalApi.post('/delete', {
                orderNo: record.orderNo
            });

            if (response.success) {
                message.success(intl.formatMessage({ id: 'order.delete.success' }));
                onRefresh();
            } else {
                throw new Error(response.message || 'Delete failed');
            }
        } catch (error) {
            message.error(error.message || intl.formatMessage({ id: 'order.delete.fail' }));
        }
    };

    const handleBatchDelete = async () => {
        try {
            const response = await internalApi.post('/batchDelete', {
                orderNos: isSelectAll ? 'all' : selectedRowKeys
            });

            if (response.success) {
                message.success(intl.formatMessage({ id: 'order.batchDelete.success' }));
                setSelectedRowKeys([]);
                setIsSelectAll(false);
                onRefresh();
            } else {
                throw new Error(response.message || 'Batch delete failed');
            }
        } catch (error) {
            message.error(error.message || intl.formatMessage({ id: 'order.batchDelete.fail' }));
        }
    };

    const handleBatchExport = async () => {
        try {
            // 获取选中的数据 - 使用原始数据
            const selectedRawData = isSelectAll ? rawData : rawData.filter(item => selectedRowKeys.includes(item.orderNumber));
            
            if (selectedRawData.length === 0) {
                message.warning(intl.formatMessage({ id: 'order.export.noData' }));
                return;
            }

            // 准备导出数据 - 包含所有原始字段
            const exportData = selectedRawData.map(order => {
                const exportRow = {};
                
                // 添加所有可能的字段，使用原始字段名作为键
                Object.keys(order).forEach(key => {
                    let value = order[key];
                    
                    // 根据字段类型进行格式化
                    switch (key) {
                        case 'orderAmount':
                            value = value ? `¥${Number(value).toFixed(2)}` : '-';
                            break;
                        case 'orderStatus':
                            value = intl.formatMessage({ 
                                id: `order.search.status.${value?.toLowerCase()}` 
                            }) || value;
                            break;
                        case 'orderCreateTime':
                        case 'orderUpdateTime':
                        case 'createTime':
                        case 'updateTime':
                            // 时间字段保持原样
                            break;
                        case 'orderPreviewUrl':
                        case 'productImage':
                        case 'productThumbnail':
                            // 图片URL字段保持原样
                            break;
                        default:
                            // 其他字段保持原样
                            break;
                    }
                    
                    // 使用字段名作为列标题，如果没有国际化键则使用字段名本身
                    const columnTitle = intl.formatMessage({ 
                        id: `table.column.${key}` 
                    }, { defaultValue: key });
                    
                    exportRow[columnTitle] = value || '-';
                });
                
                return exportRow;
            });

            // 创建工作簿
            const workbook = XLSX.utils.book_new();
            const worksheet = XLSX.utils.json_to_sheet(exportData);

            // 自动设置列宽
            const columnWidths = Object.keys(exportData[0] || {}).map(() => ({ wch: 20 }));
            worksheet['!cols'] = columnWidths;

            // 添加工作表到工作簿
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Orders');

            // 生成文件名
            const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
            const fileName = `orders_export_${timestamp}.xlsx`;

            // 下载文件 - 使用跨平台兼容的方式
            XLSX.writeFile(workbook, fileName);
            
            message.success(intl.formatMessage({ id: 'order.batchExport.success' }));
        } catch (error) {
            console.error('Export error:', error);
            message.error(intl.formatMessage({ id: 'order.batchExport.fail' }));
        }
    };

    const columns = getOrderColumns(intl, {
        onEdit: handleEdit,
        refreshData: onRefresh,
        handleDelete,
        isSelectionMode: selectedRowKeys.length > 0 || isSelectAll
    });

    const rowSelection = {
        selectedRowKeys,
        onChange: (newSelectedRowKeys) => {
            setSelectedRowKeys(newSelectedRowKeys);
            setIsSelectAll(false);
        },
        selections: [
            {
                key: 'all-data',
                text: intl.formatMessage({ id: 'table.selectAll.allPages' }),
                onSelect: () => {
                    setIsSelectAll(true);
                    setSelectedRowKeys(data.map(item => item.orderNo));
                }
            },
            {
                key: 'clear-all',
                text: intl.formatMessage({ id: 'table.selectAll.clear' }),
                onSelect: () => {
                    setIsSelectAll(false);
                    setSelectedRowKeys([]);
                }
            }
        ]
    };

    return (
        <>
            {(selectedRowKeys.length > 0 || isSelectAll) && (
                <Alert
                    message={
                        <Space>
                            {isSelectAll 
                                ? intl.formatMessage({ id: 'table.selected.all' })
                                : intl.formatMessage(
                                    { id: 'table.selected.count' },
                                    { count: selectedRowKeys.length }
                                )
                            }
                            <Button
                                type="link"
                                icon={<DownloadOutlined />}
                                onClick={handleBatchExport}
                            >
                                {intl.formatMessage({ id: 'table.operation.batchExport' })}
                            </Button>
                            <Popconfirm
                                title={intl.formatMessage({ id: 'order.batchDelete.confirm' })}
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
                rowKey="orderNo"
                scroll={{ x: 1500 }}
                pagination={{
                    total: data?.length,
                    pageSize: 10,
                    showSizeChanger: true,
                    showQuickJumper: true,
                    showTotal: (total) => 
                        intl.formatMessage(
                            { id: 'table.pagination.total' },
                            { total }
                        ),
                }}
            />

            <EditOrderModal
                visible={editModalVisible}
                initialValues={currentRecord}
                onCancel={() => {
                    setEditModalVisible(false);
                    setCurrentRecord(null);
                }}
                onSuccess={handleEditSuccess}
            />
        </>
    );
};

export default OrderTable;
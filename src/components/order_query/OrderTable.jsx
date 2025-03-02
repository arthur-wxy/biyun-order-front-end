import React, { useState } from 'react';
import { Table, message, Alert, Button, Popconfirm } from 'antd';
import { useIntl } from 'react-intl';
import { getOrderColumns } from './config/tableColumns';
import EditOrderModal from './components/EditOrderModal';
import { useInternalApi } from '../../network/internalApi';
import { DeleteOutlined } from '@ant-design/icons';

const OrderTable = ({ data, loading, onRefresh }) => {
    const intl = useIntl();
    const api = useInternalApi();
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
            const response = await api.post('/delete', {
                orderNo: record.orderNo
            });

            if (response.data?.success) {
                message.success(intl.formatMessage({ id: 'order.delete.success' }));
                onRefresh();
            } else {
                throw new Error(response.data?.message || 'Delete failed');
            }
        } catch (error) {
            message.error(error.message || intl.formatMessage({ id: 'order.delete.fail' }));
        }
    };

    const handleBatchDelete = async () => {
        try {
            const response = await api.post('/batchDelete', {
                orderNos: isSelectAll ? 'all' : selectedRowKeys
            });

            if (response.data?.success) {
                message.success(intl.formatMessage({ id: 'order.batchDelete.success' }));
                setSelectedRowKeys([]);
                setIsSelectAll(false);
                onRefresh();
            } else {
                throw new Error(response.data?.message || 'Batch delete failed');
            }
        } catch (error) {
            message.error(error.message || intl.formatMessage({ id: 'order.batchDelete.fail' }));
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
                        <span>
                            {isSelectAll 
                                ? intl.formatMessage({ id: 'table.selected.all' })
                                : intl.formatMessage(
                                    { id: 'table.selected.count' },
                                    { count: selectedRowKeys.length }
                                )
                            }
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
                        </span>
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
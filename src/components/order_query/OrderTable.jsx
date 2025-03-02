import React, { useState } from 'react';
import { Table, message } from 'antd';
import { useIntl } from 'react-intl';
import { getOrderColumns } from './config/tableColumns';
import EditOrderModal from './components/EditOrderModal';
import { useInternalApi } from '../../network/internalApi';

const OrderTable = ({ data, loading, onRefresh }) => {
    const intl = useIntl();
    const api = useInternalApi();
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [currentRecord, setCurrentRecord] = useState(null);

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

    const columns = getOrderColumns(intl, {
        onEdit: handleEdit,
        refreshData: onRefresh,
        handleDelete
    });

    return (
        <>
            <Table
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
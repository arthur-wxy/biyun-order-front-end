import React from 'react';
import { Table } from 'antd';
import { useIntl } from 'react-intl';
import { getOrderColumns } from './config/tableColumns';

const OrderTable = ({ data, loading }) => {
    const intl = useIntl();
    
    const columns = getOrderColumns(intl);

    return (
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
    );
};

export default OrderTable;
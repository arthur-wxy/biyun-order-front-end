import React from 'react';
import { Table, Tag, Space, Button, Image } from 'antd';
import { useIntl } from 'react-intl';

const OrderTable = ({ data, loading }) => {
    const intl = useIntl();
    
    const columns = [
        {
            title: intl.formatMessage({ id: 'table.column.image' }),
            dataIndex: 'productImage',
            key: 'productImage',
            width: 100,
            render: (image, record) => (
                <Image
                    src={record.productThumbnail || '/fallback-image.png'}
                    alt={record.productName}
                    preview={{
                        src: record.productImage || '/fallback-image.png',
                    }}
                    style={{
                        width: '50px',
                        height: '50px',
                        objectFit: 'cover',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                    fallback="/fallback-image.png"
                />
            ),
        },
        {
            title: intl.formatMessage({ id: 'table.column.orderNo' }),
            dataIndex: 'orderNo',
            key: 'orderNo',
            width: 200,
        },
        {
            title: intl.formatMessage({ id: 'table.column.productInfo' }),
            dataIndex: 'productInfo',
            key: 'productInfo',
            width: 300,
            render: (text, record) => (
                <Space direction="vertical" size="small">
                    <div>{record.productName}</div>
                    <div style={{ color: '#666' }}>{record.productSku}</div>
                </Space>
            ),
        },
        {
            title: intl.formatMessage({ id: 'table.column.amount' }),
            dataIndex: 'amount',
            key: 'amount',
            width: 120,
            align: 'right',
            render: (amount) => `¥${amount.toFixed(2)}`,
        },
        {
            title: intl.formatMessage({ id: 'table.column.receiver' }),
            dataIndex: 'receiver',
            key: 'receiver',
            width: 200,
            render: (text, record) => (
                <Space direction="vertical" size="small">
                    <div>{record.receiver}</div>
                    <div style={{ color: '#666' }}>{record.phone}</div>
                    <div style={{ color: '#666', fontSize: '12px' }}>{record.address}</div>
                </Space>
            ),
        },
        {
            title: intl.formatMessage({ id: 'table.column.status' }),
            dataIndex: 'status',
            key: 'status',
            width: 120,
            render: (status) => {
                const statusConfig = {
                    pending: { color: 'gold', text: intl.formatMessage({ id: 'order.search.status.pending' }) },
                    completed: { color: 'green', text: intl.formatMessage({ id: 'order.search.status.completed' }) },
                    cancelled: { color: 'red', text: intl.formatMessage({ id: 'order.search.status.cancelled' }) },
                };
                
                return (
                    <Tag color={statusConfig[status]?.color}>
                        {statusConfig[status]?.text}
                    </Tag>
                );
            },
        },
        {
            title: intl.formatMessage({ id: 'table.column.createTime' }),
            dataIndex: 'createTime',
            key: 'createTime',
            width: 180,
        },
        {
            title: intl.formatMessage({ id: 'table.column.operation' }),
            key: 'operation',
            fixed: 'right',
            width: 120,
            render: (_, record) => (
                <Space size="middle">
                    <Button type="link" size="small">
                        {intl.formatMessage({ id: 'table.operation.view' })}
                    </Button>
                    <Button type="link" size="small">
                        {intl.formatMessage({ id: 'table.operation.edit' })}
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <Table
            columns={columns}
            dataSource={data}
            loading={loading}
            rowKey="orderNo"
            scroll={{ x: 1400 }}
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
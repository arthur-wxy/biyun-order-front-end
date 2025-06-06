import { Space, Tag, Button, Image, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import React from 'react';

export const getOrderColumns = (intl, { onEdit, onDelete, refreshData, handleDelete, isSelectionMode }) => [
    {
        title: intl.formatMessage({ id: 'table.column.orderNo' }),
        dataIndex: 'orderNo',
        key: 'orderNo',
        width: 150,
    },
    {
        title: intl.formatMessage({ id: 'table.column.externalOrderNo' }),
        dataIndex: 'externalOrderNo',
        key: 'externalOrderNo',
        width: 150,
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
        width: 150,
        render: (text, record) => (
            <Space direction="vertical" size="small">
                <div>{record.receiver}</div>
                <div style={{ color: '#666' }}>{record.phone}</div>
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
        title: intl.formatMessage({ id: 'table.column.image' }),
        dataIndex: 'productImage',
        key: 'productImage',
        width: 100,
        render: (image) => (
            image ? (
                <Image
                    src={image}
                    style={{
                        width: '50px',
                        height: '50px',
                        objectFit: 'cover',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                    fallback="/fallback-image.png"
                />
            ) : (
                <div style={{
                    width: '50px',
                    height: '50px',
                    background: '#f5f5f5',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    N/A
                </div>
            )
        ),
    },
    {
        title: intl.formatMessage({ id: 'table.column.operation' }),
        key: 'operation',
        fixed: 'right',
        width: 100,
        render: (_, record) => (
            !isSelectionMode && (
                <Space direction="vertical" size={0} style={{ width: '100%' }}>
                    <Button
                        type="link"
                        size="small"
                        icon={<EditOutlined />}
                        onClick={() => onEdit(record)}
                        style={{ padding: '4px 0' }}
                    >
                        {intl.formatMessage({ id: 'table.operation.edit' })}
                    </Button>
                    <Popconfirm
                        title={intl.formatMessage({ id: 'order.delete.confirm' })}
                        onConfirm={() => handleDelete(record)}
                        okText={intl.formatMessage({ id: 'common.yes' })}
                        cancelText={intl.formatMessage({ id: 'common.no' })}
                    >
                        <Button
                            type="link"
                            size="small"
                            danger
                            icon={<DeleteOutlined />}
                            style={{ padding: '4px 0' }}
                        >
                            {intl.formatMessage({ id: 'table.operation.delete' })}
                        </Button>
                    </Popconfirm>
                </Space>
            )
        ),
    },
]; 
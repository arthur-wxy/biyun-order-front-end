import React from 'react';
import { Button, Space, Tag, Image } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { useIntl } from 'react-intl';

export const getOrderColumns = (intl, { onEdit, refreshData, handleDelete, isSelectionMode }) => {
    return [
        {
            title: intl.formatMessage({ id: 'order.column.orderId' }),
            dataIndex: 'orderId',
            key: 'orderId',
            width: 100,
            fixed: 'left',
        },
        {
            title: intl.formatMessage({ id: 'order.column.sku' }),
            dataIndex: 'sku',
            key: 'sku',
            width: 120,
            fixed: 'left',
        },
        {
            title: intl.formatMessage({ id: 'order.column.productName' }),
            dataIndex: 'productName',
            key: 'productName',
            width: 300,
            ellipsis: true,
            render: (text) => (
                <div title={text} style={{ maxWidth: 280 }}>
                    {text}
                </div>
            ),
        },
        {
            title: intl.formatMessage({ id: 'order.column.skuTic' }),
            dataIndex: 'skuTic',
            key: 'skuTic',
            width: 150,
        },
        {
            title: intl.formatMessage({ id: 'order.column.quantity' }),
            dataIndex: 'quantity',
            key: 'quantity',
            width: 80,
        },
        {
            title: intl.formatMessage({ id: 'order.column.price' }),
            dataIndex: 'price',
            key: 'price',
            width: 100,
            render: (price) => price ? `¥${Number(price).toFixed(2)}` : '-',
        },
        {
            title: intl.formatMessage({ id: 'order.column.quotedPrice' }),
            dataIndex: 'quotedPrice',
            key: 'quotedPrice',
            width: 100,
            render: (price) => price ? `¥${Number(price).toFixed(2)}` : '-',
        },
        {
            title: intl.formatMessage({ id: 'order.column.shippingFullName' }),
            dataIndex: 'shippingFullName',
            key: 'shippingFullName',
            width: 150,
        },
        {
            title: intl.formatMessage({ id: 'order.column.address1' }),
            dataIndex: 'address1',
            key: 'address1',
            width: 200,
            ellipsis: true,
        },
        {
            title: intl.formatMessage({ id: 'order.column.address2' }),
            dataIndex: 'address2',
            key: 'address2',
            width: 150,
            render: (text) => text || '-',
        },
        {
            title: intl.formatMessage({ id: 'order.column.city' }),
            dataIndex: 'city',
            key: 'city',
            width: 120,
        },
        {
            title: intl.formatMessage({ id: 'order.column.state' }),
            dataIndex: 'state',
            key: 'state',
            width: 100,
        },
        {
            title: intl.formatMessage({ id: 'order.column.country' }),
            dataIndex: 'country',
            key: 'country',
            width: 80,
        },
        {
            title: intl.formatMessage({ id: 'order.column.zip' }),
            dataIndex: 'zip',
            key: 'zip',
            width: 100,
        },
        {
            title: intl.formatMessage({ id: 'order.column.phone' }),
            dataIndex: 'phone',
            key: 'phone',
            width: 120,
        },
        {
            title: intl.formatMessage({ id: 'order.column.email' }),
            dataIndex: 'email',
            key: 'email',
            width: 180,
            render: (text) => text || '-',
        },
        {
            title: intl.formatMessage({ id: 'order.column.shippingMethod' }),
            dataIndex: 'shippingMethod',
            key: 'shippingMethod',
            width: 150,
        },
        {
            title: intl.formatMessage({ id: 'order.column.orderPreviewUrl' }),
            dataIndex: 'orderPreviewUrl',
            key: 'orderPreviewUrl',
            width: 120,
            render: (url) => url ? (
                <Button 
                    type="link" 
                    icon={<EyeOutlined />}
                    onClick={() => window.open(url, '_blank')}
                >
                    {intl.formatMessage({ id: 'order.preview' })}
                </Button>
            ) : '-',
        },
        {
            title: intl.formatMessage({ id: 'order.column.designUrl' }),
            dataIndex: 'designUrl',
            key: 'designUrl',
            width: 120,
            render: (url) => url ? (
                <Button 
                    type="link" 
                    icon={<EyeOutlined />}
                    onClick={() => window.open(url, '_blank')}
                >
                    {intl.formatMessage({ id: 'order.design' })}
                </Button>
            ) : '-',
        },
        {
            title: intl.formatMessage({ id: 'order.column.color' }),
            dataIndex: 'color',
            key: 'color',
            width: 100,
        },
        {
            title: intl.formatMessage({ id: 'order.column.size' }),
            dataIndex: 'size',
            key: 'size',
            width: 150,
        },
        {
            title: intl.formatMessage({ id: 'order.column.customizationUrl' }),
            dataIndex: 'customizationUrl',
            key: 'customizationUrl',
            width: 120,
            render: (url) => url ? (
                <Button 
                    type="link" 
                    icon={<EyeOutlined />}
                    onClick={() => window.open(url, '_blank')}
                >
                    {intl.formatMessage({ id: 'order.customization' })}
                </Button>
            ) : '-',
        },
        {
            title: intl.formatMessage({ id: 'order.column.customilyUniqId' }),
            dataIndex: 'customilyUniqId',
            key: 'customilyUniqId',
            width: 150,
            render: (text) => text || '-',
        },
        {
            title: intl.formatMessage({ id: 'order.column.uniqField' }),
            dataIndex: 'uniqField',
            key: 'uniqField',
            width: 120,
            render: (text) => text || '-',
        },
        {
            title: intl.formatMessage({ id: 'order.column.orderCreateTime' }),
            dataIndex: 'orderCreateTime',
            key: 'orderCreateTime',
            width: 180,
            render: (time) => time ? new Date(time).toLocaleString() : '-',
        },
        {
            title: intl.formatMessage({ id: 'order.column.fulfillmentFields' }),
            dataIndex: 'fulfillmentFields',
            key: 'fulfillmentFields',
            width: 150,
            render: (text) => text || '-',
        },
        {
            title: intl.formatMessage({ id: 'order.column.shopify' }),
            dataIndex: 'shopify',
            key: 'shopify',
            width: 100,
            render: (text) => text || '-',
        },
        {
            title: intl.formatMessage({ id: 'order.column.shopifyProductType' }),
            dataIndex: 'shopifyProductType',
            key: 'shopifyProductType',
            width: 150,
        },
        {
            title: intl.formatMessage({ id: 'order.column.numberOfNames' }),
            dataIndex: 'numberOfNames',
            key: 'numberOfNames',
            width: 120,
            render: (text) => text || '-',
        },
        {
            title: intl.formatMessage({ id: 'order.column.orderStatus' }),
            dataIndex: 'orderStatus',
            key: 'orderStatus',
            width: 120,
            fixed: 'right',
            render: (status) => {
                const statusConfig = {
                    'WAIT_QUOTATION': { color: 'orange', text: intl.formatMessage({ id: 'order.status.waitQuotation' }) },
                    'QUOTED': { color: 'blue', text: intl.formatMessage({ id: 'order.status.quoted' }) },
                    'CONFIRMED': { color: 'green', text: intl.formatMessage({ id: 'order.status.confirmed' }) },
                    'SHIPPED': { color: 'purple', text: intl.formatMessage({ id: 'order.status.shipped' }) },
                    'DELIVERED': { color: 'green', text: intl.formatMessage({ id: 'order.status.delivered' }) },
                    'CANCELLED': { color: 'red', text: intl.formatMessage({ id: 'order.status.cancelled' }) },
                };
                const config = statusConfig[status] || { color: 'default', text: status };
                return <Tag color={config.color}>{config.text}</Tag>;
            },
        },
        {
            title: intl.formatMessage({ id: 'common.operation' }),
            key: 'operation',
            width: 120,
            fixed: 'right',
            render: (_, record) => (
                <Space size="small">
                    <Button
                        type="link"
                        size="small"
                        icon={<EditOutlined />}
                        onClick={() => onEdit(record)}
                    >
                        {intl.formatMessage({ id: 'common.edit' })}
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => handleDelete(record)}
                    >
                        {intl.formatMessage({ id: 'common.delete' })}
                    </Button>
                </Space>
            ),
        },
    ];
}; 
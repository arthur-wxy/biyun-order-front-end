import React from 'react';
import { Image, Space, Table, Tag } from 'antd';
import { useIntl } from 'react-intl';

const OrderTable = () => {
    const intl = useIntl();
    
    const columns = [
        {
            title: intl.formatMessage({ id: 'table.column.orderNo' }),
            dataIndex: 'order_no',
            key: 'order_no',
            render: (text) => <div>{text}</div>,
        },
        {
            title: intl.formatMessage({ id: 'table.column.productInfo' }),
            dataIndex: 'product_info',
            key: 'product_info',
        },
        {
            title: '创建时间',
            dataIndex: 'gmt_create',
            key: 'gmt_create',
        },
        {
            title: '外部订单号',
            key: 'external_order_no',
            dataIndex: 'external_order_no',
        },
        {
            title: '订单金额',
            dataIndex: 'amount',
            key: 'amount',
        },
        {
            title: '收件人',
            dataIndex: 'receiver',
            key: 'receiver',
        },
        {
            title: '物流方式',
            dataIndex: 'logistics_method',
            key: 'logistics_method',
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: '图片',
            dataIndex: 'image',
            key: 'image',
            render: () => <Image src='logo.png' />
        },
        {
            title: "操作",
            dataIndex: 'operate',
            key: "operate",
            render: () => (<div>
                <a>导出</a>
                <br />
                <a>复制</a>
                <br />
                <a>冻结</a>
                <br />
                <a>删除</a>
                <br />
            </div>)
        },
    ];

    const data = [
        {
            key: '1',
            order_no: '123',
            product_info: '商品信息',
            gmt_create: '2025-02-06',
            external_order_no: '23456',
            amount: '$100',
            receiver: 'Bill Green',
            logistics_method: '顺丰',
            status: '已完成',
        },
    ];

    return <Table columns={columns} dataSource={data} />;
};

export default OrderTable;
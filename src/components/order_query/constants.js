export const searchFields = [
  {
    name: 'orderNo',
    label: '订单号',
    type: 'input'
  },
  {
    name: 'externalOrderNo',
    label: '外部订单号',
    type: 'input'
  },
  {
    name: 'status',
    label: '订单状态',
    type: 'select',
    options: [
      { label: '全部', value: '' },
      { label: '待处理', value: 'PENDING' },
      { label: '已完成', value: 'COMPLETED' },
      { label: '已取消', value: 'CANCELLED' }
    ]
  },
  {
    name: 'dateRange',
    label: '创建时间',
    type: 'dateRange'
  }
]; 
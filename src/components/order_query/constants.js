export const searchFields = [
  {
    name: 'orderId',
    labelId: 'order.search.orderId',
    type: 'input'
  },
  {
    name: 'orderNo',
    labelId: 'order.search.orderNo',
    type: 'input'
  },
  {
    name: 'externalOrderNo',
    labelId: 'order.search.externalOrderNo',
    type: 'input'
  },
  {
    name: 'sku',
    labelId: 'order.search.sku',
    type: 'input'
  },
  {
    name: 'skuTic',
    labelId: 'order.search.skuTic',
    type: 'input'
  },
  {
    name: 'productName',
    labelId: 'order.search.productName',
    type: 'input'
  },
  {
    name: 'shippingFullName',
    labelId: 'order.search.shippingFullName',
    type: 'input'
  },
  {
    name: 'status',
    labelId: 'order.search.status',
    type: 'select',
    options: [
      { label: 'order.search.status.all', value: '' },
      { label: 'order.search.status.pending', value: 'PENDING' },
      { label: 'order.search.status.completed', value: 'COMPLETED' },
      { label: 'order.search.status.cancelled', value: 'CANCELLED' }
    ]
  },
  {
    name: 'dateRange',
    labelId: 'order.search.dateRange',
    type: 'dateRange'
  }
]; 
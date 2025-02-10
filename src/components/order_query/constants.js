export const searchFields = [
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
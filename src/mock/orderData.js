// 生成随机订单号
const generateOrderNo = () => {
  return 'ORD' + Date.now().toString().slice(-8) + Math.floor(Math.random() * 1000).toString().padStart(3, '0');
};

// 生成随机手机号
const generatePhone = () => {
  return '1' + Math.floor(Math.random() * 10).toString() + ''.padStart(9, Math.floor(Math.random() * 10).toString());
};

// 生成随机金额
const generateAmount = () => {
  return Math.floor(Math.random() * 10000) / 100;
};

// 生成随机日期
const generateDate = () => {
  const start = new Date(2024, 0, 1);
  const end = new Date();
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return date.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });
};

// 示例产品数据
const products = [
  { 
    name: '智能手表 Pro', 
    sku: 'SW-PRO-001',
    image: '/products/smart-watch.jpg',
    thumbnail: '/products/smart-watch-thumb.jpg'
  },
  { 
    name: '无线耳机 Max', 
    sku: 'WH-MAX-002',
    image: '/products/wireless-headphone.jpg',
    thumbnail: '/products/wireless-headphone-thumb.jpg'
  },
  { 
    name: '便携充电宝', 
    sku: 'PB-PORT-003',
    image: '/products/power-bank.jpg',
    thumbnail: '/products/power-bank-thumb.jpg'
  },
  { 
    name: '蓝牙音箱 Mini', 
    sku: 'BS-MINI-004',
    image: '/products/bluetooth-speaker.jpg',
    thumbnail: '/products/bluetooth-speaker-thumb.jpg'
  },
  { 
    name: '智能手环 Lite', 
    sku: 'SB-LITE-005',
    image: '/products/smart-band.jpg',
    thumbnail: '/products/smart-band-thumb.jpg'
  }
];

// 示例地址数据
const addresses = [
  '上海市浦东新区张江高科技园区',
  '北京市朝阳区望京SOHO',
  '广州市天河区珠江新城',
  '深圳市南山区科技园',
  '杭州市西湖区浙大科技园'
];

// 示例收件人名字
const names = [
  '张三',
  '李四',
  '王五',
  '赵六',
  '钱七'
];

// 生成随机状态
const statuses = ['pending', 'completed', 'cancelled'];

// 生成模拟数据
export const generateMockOrders = (count = 100) => {
  return Array.from({ length: count }, () => {
    const product = products[Math.floor(Math.random() * products.length)];
    const name = names[Math.floor(Math.random() * names.length)];
    const address = addresses[Math.floor(Math.random() * addresses.length)];
    
    return {
      orderNo: generateOrderNo(),
      productName: product.name,
      productSku: product.sku,
      productImage: product.image,
      productThumbnail: product.thumbnail,
      createTime: generateDate(),
      amount: generateAmount(),
      receiver: name,
      phone: generatePhone(),
      address: address,
      status: statuses[Math.floor(Math.random() * statuses.length)]
    };
  });
};

// 导出默认的模拟数据
export const mockOrders = generateMockOrders(); 
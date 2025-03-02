import React, { useState } from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload, Form, Select, Progress, Card, Space } from 'antd';
import { useInternalApi } from '../../network/internalApi';
import { useIntl } from 'react-intl';
import OrderTable from './OrderTable';
import { mockOrders } from '../../mock/orderData';

const { Dragger } = Upload;
const { Option } = Select;

// 配置开关
const DEBUG = false; // 设置为 true 时使用 mock 数据，false 时使用真实接口

// 文件大小限制（10MB）
const MAX_FILE_SIZE = 10 * 1024 * 1024;

const OrderImport = () => {
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [importType, setImportType] = useState('ORDER');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState('normal'); // 'normal', 'active', 'success', 'exception'
  const [showTable, setShowTable] = useState(false);
  const [importedData, setImportedData] = useState([]);
  const api = useInternalApi();
  const intl = useIntl();

  // 添加数据转换函数
  const transformOrderData = (apiData) => {
    return apiData.map(item => ({
      orderNo: item.orderNumber,
      externalOrderNo: item.externalOrderId,
      productName: item.productName,
      productSku: item.sku,
      amount: parseFloat(item.orderAmount),
      receiver: item.actualCustomer,
      phone: item.customerPhone,
      status: item.orderStatus,
      createTime: item.orderCreateTime,
      productImage: item.orderPreviewUrl || '/fallback-image.png',
      productThumbnail: item.orderPreviewUrl || '/fallback-image.png'
    }));
  };

  const handleUpload = async (file) => {
    setUploading(true);
    setUploadProgress(0);
    setUploadStatus('active');
    let progressInterval;
    
    try {
      if (DEBUG) {
        // Debug 模式：使用 mock 数据
        progressInterval = setInterval(() => {
          setUploadProgress(prev => {
            if (prev >= 90) {
              clearInterval(progressInterval);
              return 90;
            }
            return prev + 10;
          });
        }, 200);

        // 模拟API调用延迟
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // 模拟上传成功
        clearInterval(progressInterval);
        setUploadProgress(100);
        setUploadStatus('success');
        message.success(intl.formatMessage({ id: 'order.import.success' }));
        
        // 使用 mock 数据
        setImportedData(mockOrders.slice(0, 10));
        setShowTable(true);
      } else {
        // 生产模式：使用真实接口
        const formData = new FormData();
        formData.append('importFile', file);  // 直接使用文件对象
        formData.append('type', importType);

        // 添加日志查看请求配置
        const baseURL = api.instance.defaults.baseURL;
        console.log('Request URL:', baseURL + '/excel');
        console.log('FormData:', {
          file: file.name,
          type: importType,
          size: file.size,
          mimeType: file.type
        });

        // 打印完整的 FormData 内容以便调试
        for (let pair of formData.entries()) {
          console.log('FormData entry:', pair[0], pair[1]);
        }

        const response = await api.post('/excel', formData, {
          headers: {
            'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary' + Math.random().toString(36).substring(2)
          },
          onUploadProgress: (progressEvent) => {
            const progress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(progress);
          }
        });

        if (response.data?.success) {
          setUploadStatus('success');
          message.success(intl.formatMessage({ id: 'order.import.success' }));
          
          // 转换并使用接口返回的数据
          if (response.data?.content) {
            const transformedData = transformOrderData(response.data.content);
            setImportedData(transformedData);
            setShowTable(true);
          }
        } else {
          throw new Error(response.data?.message || 'Upload failed');
        }
      }
    } catch (error) {
      if (progressInterval) {
        clearInterval(progressInterval);
      }
      setUploadStatus('exception');
      message.error(
        DEBUG
          ? intl.formatMessage({ id: 'order.import.fail' })
          : error.message || intl.formatMessage({ id: 'order.import.fail' })
      );
    } finally {
      setUploading(false);
    }
  };

  const uploadProps = {
    name: 'importFile',
    multiple: false,
    maxCount: 1,
    fileList,
    beforeUpload: (file) => {
      const isExcel = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || 
                      file.type === 'application/vnd.ms-excel';
      if (!isExcel) {
        message.error(intl.formatMessage({ id: 'order.import.hint' }));
        return Upload.LIST_IGNORE;
      }

      const isLt10M = file.size < MAX_FILE_SIZE;
      if (!isLt10M) {
        message.error(intl.formatMessage(
          { id: 'order.import.sizeLimit' }, 
          { size: MAX_FILE_SIZE / 1024 / 1024 }
        ));
        return Upload.LIST_IGNORE;
      }

      handleUpload(file);
      return false;
    },
    onRemove: () => {
      setFileList([]);
      setUploadProgress(0);
      setUploadStatus('normal');
      setShowTable(false);
      setImportedData([]);
    }
  };

  return (
    <Space direction="vertical" style={{ width: '100%' }} size="large">
      <Card>
        <Form layout="vertical">
          <Form.Item 
            label={intl.formatMessage({ id: 'order.import.type' })}
            style={{ marginBottom: 24 }}
          >
            <Select
              value={importType}
              onChange={setImportType}
              style={{ width: 200 }}
            >
              <Option value="ORDER">
                {intl.formatMessage({ id: 'order.import.type.order' })}
              </Option>
              <Option value="PRODUCT">
                {intl.formatMessage({ id: 'order.import.type.product' })}
              </Option>
            </Select>
          </Form.Item>

          <Dragger {...uploadProps}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              {intl.formatMessage({ id: 'order.import.dragText' })}
            </p>
            <p className="ant-upload-hint">
              {intl.formatMessage({ id: 'order.import.hint' })}
            </p>
          </Dragger>

          {uploadProgress > 0 && (
            <Progress
              percent={uploadProgress}
              status={uploadStatus}
              style={{ marginTop: 16 }}
            />
          )}
        </Form>
      </Card>

      {showTable && (
        <Card title={intl.formatMessage({ id: 'order.import.preview' })}>
          <OrderTable 
            data={importedData}
            loading={false}
          />
        </Card>
      )}
    </Space>
  );
};

export default OrderImport;
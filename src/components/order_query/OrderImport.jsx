import React, { useState } from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload, Form, Select, Progress } from 'antd';
import { useInternalApi } from '../../network/internalApi';
import { API_CONFIG } from '../../network/config';

const { Dragger } = Upload;
const { Option } = Select;

// 文件大小限制（10MB）
const MAX_FILE_SIZE = 10 * 1024 * 1024;

const OrderImport = () => {
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [importType, setImportType] = useState('ORDER'); // 默认类型
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState('normal'); // 'normal', 'active', 'success', 'exception'
  const api = useInternalApi();

  const handleUpload = async (file) => {
    const formData = new FormData();
    formData.append('importFile', file);
    formData.append('type', importType);

    try {
      setUploading(true);
      setUploadProgress(0);
      setUploadStatus('active');

      const response = await api.post('/excel', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(progress);
        },
      });

      // 检查上传结果
      if (response.success) {
        setUploadStatus('success');
        message.success('文件上传成功');
        setFileList([]);
        
        // 如果需要处理解析的数据
        const parsedData = response.content;
        if (parsedData && parsedData.length > 0) {
          console.log('解析的数据:', parsedData);
          // 这里可以添加对解析数据的处理逻辑
        }
      } else {
        setUploadStatus('exception');
        message.error(response.errorMsg || '文件解析失败');
      }
    } catch (error) {
      console.error('Upload error:', error);
      setUploadStatus('exception');
      message.error(error.response?.data?.errorMsg || '上传失败，请重试');
    } finally {
      setUploading(false);
      // 只有在失败时才立即清除进度条
      if (uploadStatus === 'exception') {
        setTimeout(() => {
          setUploadProgress(0);
          setUploadStatus('normal');
        }, 1000);
      } else {
        // 成功时，延迟清除进度条，让用户能看到成功状态
        setTimeout(() => {
          setUploadProgress(0);
          setUploadStatus('normal');
        }, 2000);
      }
    }
  };

  const uploadProps = {
    name: 'importFile',
    multiple: false,
    fileList,
    action: false, // 禁用默认的上传行为
    customRequest: ({ file }) => {
      handleUpload(file);
    },
    beforeUpload: (file) => {
      // 检查文件大小
      if (file.size > MAX_FILE_SIZE) {
        message.error(`文件大小不能超过 ${MAX_FILE_SIZE / 1024 / 1024}MB！`);
        return false;
      }

      // 检查文件类型
      const isExcel = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || 
                      file.type === 'application/vnd.ms-excel';
      if (!isExcel) {
        message.error('只能上传 Excel 文件！');
        return false;
      }
      return true;
    },
    onChange: (info) => {
      setFileList(info.fileList.slice(-1)); // 只保留最后一个文件
      
      if (info.file.status === 'removed') {
        setFileList([]);
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };

  return (
    <div style={{ padding: '24px' }}>
      <Form layout="vertical">
        <Form.Item 
          label="导入类型" 
          required
          style={{ marginBottom: '24px' }}
        >
          <Select
            value={importType}
            onChange={setImportType}
            style={{ width: '200px' }}
          >
            <Option value="ORDER">订单导入</Option>
            <Option value="PRODUCT">商品导入</Option>
          </Select>
        </Form.Item>

        <Dragger {...uploadProps} disabled={uploading}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">点击上传或拖拽文件到此处</p>
          <p className="ant-upload-hint">
            仅支持 .xlsx 或 .xls 格式的 Excel 文件
            <br />
            文件大小不能超过 {MAX_FILE_SIZE / 1024 / 1024}MB
          </p>
          {uploading && <p>文件上传中...</p>}
        </Dragger>

        {/* 上传进度条 */}
        {uploadProgress > 0 && (
          <div style={{ marginTop: '16px' }}>
            <Progress
              percent={uploadProgress}
              status={uploadStatus}
              strokeColor={{
                '0%': '#108ee9',
                '100%': '#87d068',
              }}
            />
          </div>
        )}
      </Form>
    </div>
  );
};

export default OrderImport;
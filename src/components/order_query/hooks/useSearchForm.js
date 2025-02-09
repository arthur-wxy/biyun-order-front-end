import { Form } from 'antd';
import { useState } from 'react';

export const useSearchForm = () => {
  const [form] = Form.useForm();
  const [expand, setExpand] = useState(false);

  const handleReset = () => {
    form.resetFields();
  };

  const toggleExpand = () => {
    setExpand(!expand);
  };

  return {
    form,
    expand,
    toggleExpand,
    handleReset
  };
}; 
import React from 'react';
import { Form, Input, Select, DatePicker } from 'antd';
import PropTypes from 'prop-types';

const { RangePicker } = DatePicker;

export const SearchField = ({ name, label, type, options = [] }) => {
  const getFieldComponent = () => {
    switch (type) {
      case 'select':
        return <Select options={options} allowClear />;
      case 'dateRange':
        return <RangePicker />;
      case 'input':
      default:
        return <Input allowClear />;
    }
  };

  return (
    <Form.Item name={name} label={label}>
      {getFieldComponent()}
    </Form.Item>
  );
};

SearchField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['input', 'select', 'dateRange']),
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.any
    })
  )
}; 
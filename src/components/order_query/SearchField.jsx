import React from 'react';
import { Form, Input, Select, DatePicker } from 'antd';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';

const { RangePicker } = DatePicker;

export const SearchField = ({ name, labelId, type, options = [] }) => {
  const intl = useIntl();

  const getFieldComponent = () => {
    switch (type) {
      case 'select':
        return (
          <Select 
            options={options.map(opt => ({
              ...opt,
              label: intl.formatMessage({ id: opt.label })
            }))} 
            allowClear 
          />
        );
      case 'dateRange':
        return <RangePicker />;
      case 'input':
      default:
        return <Input allowClear />;
    }
  };

  return (
    <Form.Item 
      name={name} 
      label={intl.formatMessage({ id: labelId })}
    >
      {getFieldComponent()}
    </Form.Item>
  );
};

SearchField.propTypes = {
  name: PropTypes.string.isRequired,
  labelId: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['input', 'select', 'dateRange']),
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.any
    })
  )
}; 
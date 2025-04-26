import React from 'react';
import { Card } from 'antd';
import { useIntl } from 'react-intl';
import QuotationTable from '@/components/quotation/QuotationTable';
import logger from '@/utils/logger';

const Quotation = () => {
    const intl = useIntl();
    
    logger('QUOTATION', 'render', 'Rendering quotation page');

    return (
        <Card
            title={intl.formatMessage({ id: 'menu.quotation' })}
            bordered={false}
        >
            <QuotationTable />
        </Card>
    );
};

export default Quotation; 
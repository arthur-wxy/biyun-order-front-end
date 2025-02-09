import React from 'react';
import { Card, Typography, Image } from 'antd';
import 'antd/dist/reset.css';
const { Title, Paragraph } = Typography;

const CompanyIntroduction = () => {
    return (
        <Image src="logo.png" preview={false} style={
            {
                width:'100%',
                height:'auto'
            }
        }/>
    );
};

export default CompanyIntroduction;
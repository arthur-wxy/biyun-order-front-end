import React from 'react';
import { Space } from 'antd';
import UserStatus from '../UserStatus';
import styles from './index.module.less';

const Header = ({ children }) => {
    return (
        <div className={styles.header}>
            <Space align="center">
                {children} {/* 这里会显示语言切换按钮 */}
                <UserStatus />
            </Space>
        </div>
    );
};

export default Header; 
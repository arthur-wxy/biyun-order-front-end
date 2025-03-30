import React from 'react';
import { Dropdown, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useIntl } from 'react-intl';
import request from '../../utils/request';
import styles from './index.module.less';

const UserStatus = () => {
    const navigate = useNavigate();
    const intl = useIntl();
    const token = localStorage.getItem('authToken');
    const username = localStorage.getItem('username');

    const handleLogout = async () => {
        try {
            await request.post('/user/logout');
            localStorage.removeItem('authToken');
            localStorage.removeItem('username');
            message.success(intl.formatMessage({ id: 'logout.success' }));
            navigate('/login');
        } catch (error) {
            console.error('Logout failed:', error);
            message.error(intl.formatMessage({ id: 'logout.error' }));
        }
    };

    const dropdownItems = {
        items: [
            {
                key: 'logout',
                label: intl.formatMessage({ id: 'logout.button' }),
                onClick: handleLogout,
            },
        ],
    };

    return (
        <div className={styles.userStatus}>
            {token ? (
                <Dropdown menu={dropdownItems} placement="bottomRight">
                    <div className={styles.userInfo}>
                        <UserOutlined className={styles.userIcon} />
                        <span className={styles.userName}>
                            {username || intl.formatMessage({ id: 'user.logged' })}
                        </span>
                    </div>
                </Dropdown>
            ) : (
                <div className={styles.notLogged}>
                    <UserOutlined className={styles.userIcon} />
                    <span>{intl.formatMessage({ id: 'user.not.logged' })}</span>
                </div>
            )}
        </div>
    );
};

export default UserStatus; 
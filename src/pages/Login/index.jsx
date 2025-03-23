import React from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useIntl } from 'react-intl';
import request from '../../utils/request';
import styles from './index.module.less';
import loginBg from '../../assets/images/login-bg.png';

const Login = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const intl = useIntl();

    const handleSubmit = async (values) => {
        try {
            const response = await request.post('/public/login', {
                username: values.username,
                password: values.password
            });

            if (response.data.success) {
                const { authToken } = response.data.data;
                localStorage.setItem('authToken', authToken);
                message.success(intl.formatMessage({ id: 'login.success' }));
                navigate('/');
            } else {
                message.error(intl.formatMessage({ id: 'login.error' }));
            }
        } catch (error) {
            message.error(intl.formatMessage({ id: 'login.network.error' }));
            console.error('Login failed:', error);
        }
    };

    return (
        <div className={styles.loginContainer}>
            <div className={styles.leftSection}>
                <img 
                    src={loginBg} 
                    alt="Login Background" 
                    className={styles.loginImage}
                />
            </div>
            <div className={styles.rightSection}>
                <div className={styles.loginCard}>
                    <h2 className={styles.title}>
                        {intl.formatMessage({ id: 'login.title' })}
                    </h2>
                    <Form
                        form={form}
                        onFinish={handleSubmit}
                        size="large"
                    >
                        <Form.Item
                            name="username"
                            rules={[{ 
                                required: true, 
                                message: intl.formatMessage({ id: 'login.username.required' })
                            }]}
                        >
                            <Input
                                prefix={<UserOutlined className={styles.prefixIcon} />}
                                placeholder={intl.formatMessage({ id: 'login.username.placeholder' })}
                            />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ 
                                required: true, 
                                message: intl.formatMessage({ id: 'login.password.required' })
                            }]}
                        >
                            <Input.Password
                                prefix={<LockOutlined className={styles.prefixIcon} />}
                                placeholder={intl.formatMessage({ id: 'login.password.placeholder' })}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                block
                            >
                                {intl.formatMessage({ id: 'login.button' })}
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default Login; 
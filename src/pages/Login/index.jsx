import React from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useIntl } from 'react-intl';
import request from '../../utils/request';
import styles from './index.module.less';
import loginBg from '../../assets/images/login-bg.png';
import Header from '../../components/Header';

const Login = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const intl = useIntl();

    const handleSubmit = async (values) => {
        try {
            const params = new URLSearchParams();
            params.append('username', values.username);
            params.append('password', values.password);

            const response = await request.post(`/user/login?${params.toString()}`, null, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                }
            });

            if (response.data.success) {
                localStorage.setItem('authToken', response.data.content);
                localStorage.setItem('username', values.username);
                message.success(intl.formatMessage({ id: 'login.success' }));
                navigate('/');
            } else {
                message.error(
                    response.data.errorMsg || 
                    intl.formatMessage({ id: 'login.error' })
                );
            }
        } catch (error) {
            console.error('Login failed:', error);
            message.error(
                error.response?.data?.errorMsg || 
                intl.formatMessage({ id: 'login.network.error' })
            );
        }
    };

    return (
        <div className={styles.loginContainer}>
            <Header>
                {/* 这里放置语言切换组件 */}
                {/* 假设语言切换组件是通过父组件传入的 */}
            </Header>
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
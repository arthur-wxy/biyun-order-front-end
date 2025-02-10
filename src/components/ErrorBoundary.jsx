import React from 'react';
import { Result, Button, Space, Typography } from 'antd';
import { useIntl } from 'react-intl';
import { ReloadOutlined, RollbackOutlined, HomeOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const { Text, Paragraph } = Typography;

const ErrorContainer = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 400px;
  background: ${props => props.theme.colorBgContainer};
  border-radius: ${props => props.theme.borderRadius};
`;

const ErrorDetails = styled(Paragraph)`
  max-width: 800px;
  margin-top: 16px;
  padding: 16px;
  background: rgba(0, 0, 0, 0.02);
  border-radius: 4px;
  font-family: monospace;
`;

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null,
      errorInfo: null,
      errorCount: 0
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // 更新错误信息状态
    this.setState(prevState => ({
      errorInfo,
      errorCount: prevState.errorCount + 1
    }));

    // 记录错误到日志服务
    this.logError(error, errorInfo);
  }

  logError = (error, errorInfo) => {
    // 这里可以添加错误上报逻辑
    console.error('Error caught by boundary:', {
      error,
      errorInfo,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent
    });
  };

  handleReload = () => {
    window.location.reload();
  };

  handleReset = () => {
    this.setState({ 
      hasError: false, 
      error: null, 
      errorInfo: null 
    });
  };

  render() {
    const { hasError, error, errorInfo, errorCount } = this.state;
    const { intl, navigate } = this.props;

    if (!hasError) {
      return this.props.children;
    }

    // 如果错误次数过多，显示更友好的提示
    if (errorCount > 3) {
      return (
        <ErrorContainer>
          <Result
            status="500"
            title={intl.formatMessage({ id: 'error.persistent.title' })}
            subTitle={intl.formatMessage({ id: 'error.persistent.description' })}
            extra={[
              <Button 
                key="home"
                type="primary" 
                icon={<HomeOutlined />}
                onClick={() => navigate('/')}
              >
                {intl.formatMessage({ id: 'error.backToHome' })}
              </Button>
            ]}
          />
        </ErrorContainer>
      );
    }

    return (
      <ErrorContainer>
        <Result
          status="error"
          title={intl.formatMessage({ id: 'error.title' })}
          subTitle={intl.formatMessage({ id: 'error.description' })}
          extra={
            <Space size="middle">
              <Button
                type="primary"
                icon={<ReloadOutlined />}
                onClick={this.handleReload}
              >
                {intl.formatMessage({ id: 'error.reload' })}
              </Button>
              <Button
                icon={<RollbackOutlined />}
                onClick={() => navigate(-1)}
              >
                {intl.formatMessage({ id: 'error.goBack' })}
              </Button>
              <Button
                icon={<HomeOutlined />}
                onClick={() => navigate('/')}
              >
                {intl.formatMessage({ id: 'error.backToHome' })}
              </Button>
            </Space>
          }
        >
          {process.env.NODE_ENV === 'development' && error && (
            <>
              <Text type="danger" strong>
                {intl.formatMessage({ id: 'error.details' })}:
              </Text>
              <ErrorDetails>
                <pre>{error.toString()}</pre>
                {errorInfo && <pre>{errorInfo.componentStack}</pre>}
              </ErrorDetails>
            </>
          )}
        </Result>
      </ErrorContainer>
    );
  }
}

// HOC 包装错误边界组件以使用 intl 和 navigation
export default function ErrorBoundaryWithHooks(props) {
  const intl = useIntl();
  const navigate = useNavigate();
  return <ErrorBoundary {...props} intl={intl} navigate={navigate} />;
} 
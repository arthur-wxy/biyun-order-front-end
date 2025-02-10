import { message } from 'antd';

export const handleApiError = (error, intl) => {
  if (error.response) {
    switch (error.response.status) {
      case 401:
        message.error(intl.formatMessage({ id: 'error.unauthorized' }));
        // 可以在这里处理登出逻辑
        break;
      case 403:
        message.error(intl.formatMessage({ id: 'error.forbidden' }));
        break;
      case 404:
        message.error(intl.formatMessage({ id: 'error.notFound' }));
        break;
      case 500:
        message.error(intl.formatMessage({ id: 'error.serverError' }));
        break;
      default:
        message.error(error.response.data?.message || intl.formatMessage({ id: 'error.unknown' }));
    }
  } else if (error.request) {
    message.error(intl.formatMessage({ id: 'error.network' }));
  } else {
    message.error(intl.formatMessage({ id: 'error.unknown' }));
  }
}; 
import React, { createContext, useState, useEffect } from 'react';
import { IntlProvider } from 'react-intl';
import zhCN from '../locales/zh-CN';
import enUS from '../locales/en-US';

export const LocaleContext = createContext();

const messages = {
  'zh-CN': zhCN,
  'zh': zhCN,     // 添加简写支持
  'zh-TW': zhCN,  // 添加繁体支持
  'en-US': enUS,
  'en': enUS,     // 添加简写支持
};

// 获取浏览器首选语言
const getBrowserLanguage = () => {
  const browserLang = navigator.language || navigator.userLanguage;
  // 先尝试完整匹配
  if (messages[browserLang]) {
    return browserLang;
  }
  // 再尝试语言代码匹配（如 'zh' 或 'en'）
  const langCode = browserLang.split('-')[0];
  if (messages[langCode]) {
    return langCode;
  }
  // 默认返回中文
  return 'zh-CN';
};

// 获取初始语言设置
const getInitialLocale = () => {
  const savedLocale = localStorage.getItem('preferred-locale');
  if (savedLocale && messages[savedLocale]) {
    return savedLocale;
  }
  return getBrowserLanguage();
};

export const LocaleProvider = ({ children }) => {
  // 使用保存的语言或浏览器语言初始化
  const [locale, setLocale] = useState(getInitialLocale());

  // 监听系统语言变化
  useEffect(() => {
    const handleLanguageChange = () => {
      setLocale(getBrowserLanguage());
    };

    // 某些现代浏览器支持语言变化事件
    window.addEventListener('languagechange', handleLanguageChange);

    return () => {
      window.removeEventListener('languagechange', handleLanguageChange);
    };
  }, []);

  const toggleLocale = () => {
    const newLocale = locale.startsWith('zh') ? 'en-US' : 'zh-CN';
    setLocale(newLocale);
    localStorage.setItem('preferred-locale', newLocale);
  };

  return (
    <LocaleContext.Provider value={{ locale, toggleLocale }}>
      <IntlProvider 
        messages={messages[locale]} 
        locale={locale}
        defaultLocale="zh-CN"
      >
        {children}
      </IntlProvider>
    </LocaleContext.Provider>
  );
}; 
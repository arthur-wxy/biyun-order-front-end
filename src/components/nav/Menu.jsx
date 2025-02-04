import React, { useEffect, useState } from "react";
import { Button, Menu } from "antd";
import {
    AppstoreOutlined,
    ContainerOutlined,
    DesktopOutlined,
    MailOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PieChartOutlined,
  } from '@ant-design/icons';
import { useInternalApi } from "../../network/internalApi";
  
const MyMenu = () => {
  const [items, setItems] = useState(null);
  const internalApi = useInternalApi();
  useEffect(()=>{
    internalApi.get("/menu/getMenuConf.json", {})
    .then(response => {
      if(response.data.success) {
        setItems(response.data.content)
      }
    })
    .catch(error => {
      console.log("error occurs!");
      setItems([]);
    })
  }, []);
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  return (<>
  <div
      style={{
        width: 256,
      }}
    >
      <Button
        type="primary"
        onClick={toggleCollapsed}
        style={{
          marginBottom: 16,
        }}
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        items={items}
      />
    </div>
  </>);
}

export default MyMenu;
import React, { useEffect, useState } from "react";
import { Button, Menu, Image } from "antd";
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
  
const MyMenu = (props) => {
  const [items, setItems] = useState(null);
  const internalApi = useInternalApi();
  useEffect(()=>{
    internalApi.get("/menu/getMenuConf.json", {})
    .then(response => {
      if(response.data.success) {
        const realItems = response.data.content.map(item => {
          const icon = item.icon == null ? null : (<Image src={item.icon} preview={false}/>)
          return {
            ...item,
            icon:icon
          };
        });
        setItems(realItems)
      }
    })
    .catch(error => {
      console.log("error occurs!");
      setItems([]);
    })
  }, []);
  return (<>
  <div>
      <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="dark"
        items={items}
      />
    </div>
  </>);
}

export default MyMenu;
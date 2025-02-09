import React, { useEffect, useState } from "react";
import { Button, Menu, Image, Switch } from "antd";
import { useInternalApi } from "../../network/internalApi";
import { Link } from "react-router-dom";
import OrderSearchForm from "../order_query/OrderSearchForm";

const MyMenu = (props) => {
  const [items, setItems] = useState([]);
  const internalApi = useInternalApi();
  useEffect(() => {
    internalApi.get("/menu/getMenuConf.json", {})
      .then(response => {
        if (response.data.success) {
          const realItems = response.data.content.map(item => {
            const result = {
              ...item,
              label: <Link to={item.link}>{item.label}</Link>,
              icon: item.icon == null ? null : (<Image src={item.icon} preview={false} />)
            };
            if (result.children) {
              const newChildren = result.children.map(i => {
                return {
                  ...i,
                  label: <Link to={i.link}>{i.label}</Link>,
                  icon: i.icon == null ? null : (<Image src={i.icon} preview={false} />)
                }
              });
              result.children = newChildren;
            }
            console.log(result);
            return result;
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
    <Menu
      defaultSelectedKeys={['order_query']}
      defaultOpenKeys={['order_manage']}
      mode="inline"
      theme="dark"
      items={items}
    />
  </>);
}

export default MyMenu;
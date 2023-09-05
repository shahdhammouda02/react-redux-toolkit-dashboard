import React from 'react';
import { Menu, Image } from 'antd';
import { AppstoreOutlined, ShopOutlined, ShoppingCartOutlined, LogoutOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import styles from './sidemenu.module.css';
import logo from "../../assets/images/logo.png"

const { SubMenu } = Menu;

const SideMenu = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (key) => {
    navigate(key);
  };

  const handleProductClick = (key) => {
    navigate(key);
  };

  return (
    <div className={styles.sidemenu}>
      <Image src={logo} alt="logo" className={styles.logo}></Image>
      <Menu
        className={styles.menu}
        theme="light"
        mode="inline"
        defaultSelectedKeys={['login']}
        onClick={(item) => {
          navigate(item.key);
        }}
      >
        <Menu.Item
          title="Dashboard"
          icon={<AppstoreOutlined style={{ fontSize: "18px", color: "white" }} />}
          key="/dashboard"
          className={styles.menuitem}
          style={{ marginTop: "20px" }}

        >Dashboard</Menu.Item> 
        
        <SubMenu
          key="categories"
          title="Categories"
          icon={<ShopOutlined style={{ fontSize: "18px", color: "white" }} />}
          className={styles.menuitem}
          style={{ marginTop: "30px" }}
        >
          <Menu.Item key="/allcategories" onClick={() => handleCategoryClick('/allcategories')}>
            All Categories
          </Menu.Item>
        </SubMenu>

        <SubMenu
          key="products"
          title="Products"
          icon={<ShoppingCartOutlined style={{ fontSize: "18px", color: "white" }} />}
          className={styles.menuitem}
          style={{ marginTop: "30px" }}
        >
          <Menu.Item key="/allproducts" onClick={() => handleProductClick('/products')}>
            All Products
          </Menu.Item>
        </SubMenu>


        <Menu.Item
          title="Logout"
          icon={<LogoutOutlined style={{ fontSize: "18px", color: "white" }} />}
          key="/"
          className={styles.menuitem}
          style={{ marginTop: "30px" }}
        > Logout</Menu.Item>
      </Menu>
    </div>
  );
};

export default SideMenu;

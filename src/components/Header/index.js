import { Badge, Space, Typography, Button } from "antd";
import {MailOutlined, BellFilled, MenuUnfoldOutlined,
  MenuFoldOutlined, LogoutOutlined} from "@ant-design/icons"
import { useNavigate } from 'react-router-dom';
import styles from './header.module.css'
const Header=({ collapsed, toggleCollapsed })=>{
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    navigate('/');
  };
    return(
        <div className={styles.header}>
             <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={toggleCollapsed} 
          style={{
            fontSize: '16px',
            width: 64,
            height: 64,
            
          }}
        />
            <Typography.Title className={styles.title}>Shahd's Dashboard</Typography.Title>
            
            <Space>
            <Badge onClick={handleLogoutClick}>
          <LogoutOutlined className={styles.icons} />
        </Badge>
        <Badge count={10} dot>
          <MailOutlined className={styles.icons} />
        </Badge>
        <Badge count={20}>
          <BellFilled className={styles.icons} />
        </Badge>
       
      </Space>
        </div>
    )
}
export default Header;
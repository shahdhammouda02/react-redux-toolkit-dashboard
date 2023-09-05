import { Typography, Space, Card, Statistic } from "antd"
import {ShoppingCartOutlined, DollarCircleOutlined, UserOutlined, ShoppingOutlined} from "@ant-design/icons"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react";
const Dashboard = () => {
  const navigate=useNavigate();

  useEffect(()=>{
  navigate('/allproducts')
  },[navigate])

  return (
    <div>
      <Typography.Title level={4}>Dashboard</Typography.Title>
      <Space direction="horizontal">
          <DashboardCard 
          icon={<ShoppingCartOutlined style={{
              color: "purple",
              backgroundColor:"rgba(0,0,255,0.15)",
              borderRadius:20,
              fontSize:24,
              padding: 8
            }}  
              />} 
          title={"Orders"}
          value={12345} />   

          <DashboardCard 
          icon={<ShoppingOutlined style={{
            color: "purple",
            backgroundColor:"rgba(0,0,255,0.15)",
            borderRadius:20,
            fontSize:24,
            padding: 8
          }}
           />} 
          title={"Inventory"} 
          value={12345} />          
          <DashboardCard 
           icon={<UserOutlined style={{
            color: "purple",
            backgroundColor:"rgba(0,0,255,0.15)",
            borderRadius:20,
            fontSize:24,
            padding: 8
          }} 
          />}
           title={"Customers"} 
           value={12345} />          
          
          <DashboardCard 
          icon={<DollarCircleOutlined style={{
            color: "purple",
            backgroundColor:"rgba(0,0,255,0.15)",
            borderRadius:20,
            fontSize:24,
            padding: 8
          }}
           />} 
          title={"Revenue"} 
          value={12345} />          
      </Space>
    </div>
  )
}

const DashboardCard=({title, value, icon})=>{
  return(
    <Card>
      <Space direction="horizontal">
        {icon}
        <Statistic title={title} value={value} />
      </Space>
   </Card>
  )
}

export default Dashboard

import React, { useState } from 'react';
import { Layout } from 'antd';
import { useLocation } from 'react-router-dom';
import SideMenu from './components/SideMenu';
import PageContent from './components/PageContent';
import Footer from './components/Footer';
import AppHeader from './components/Header';
import Login from './components/Pages/Login';

const { Sider } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { pathname } = useLocation();

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="App">
      {pathname === '/' ? (
        <Login />
      ) : (
        <Layout>
          <Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
            style={{
              overflow: 'auto',
              height: '100vh',
              position: 'fixed',
              left: 0,
            }}
          >
            <div className="demo-logo-horizontal" />
            <SideMenu />
          </Sider>
          <Layout style={{ marginLeft: collapsed ? 80 : 200 }}>
            <Layout>
              <AppHeader collapsed={collapsed} toggleCollapsed={toggleCollapsed} />
            </Layout>
            <Layout>
              <PageContent />
            </Layout>
            <Layout>
              <Footer />
            </Layout>
          </Layout>
        </Layout>
      )}
    </div>
  );
};

export default App;

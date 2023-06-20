import React, { useState } from 'react';
import { Layout, Typography } from 'antd';
import { HeaderItem } from '../Header/HeaderItem';
import { SideBarItem } from '../SideBar/SideBarItem';

const { Content } = Layout;

function BaseLayout({ children, titleName }) {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <SideBarItem collapsed={collapsed} />
      <Layout>
        <HeaderItem collapsed={collapsed} setCollapsed={setCollapsed} />
        <Content style={{ margin: '0 16px' }}>
          <Typography.Title level={2}>{titleName}</Typography.Title>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}

export { BaseLayout };

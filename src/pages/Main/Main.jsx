import React, { useState } from 'react';
import { Layout } from 'antd';
import { HeaderItem } from '../../components/Header';
import { MainLayout } from '../../components/MainLayout';

function Main() {
  const [collapsed, setCollapsed] = useState(true);
  return (
    <Layout style={{ minHeight: '100vh', minWidth: '600px' }}>
      <HeaderItem collapsed={collapsed} setCollapsed={setCollapsed} />
      <MainLayout collapsed={collapsed} />
    </Layout>
  );
}

export { Main };

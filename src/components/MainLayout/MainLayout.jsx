import React, { useState } from 'react';
import { Layout } from 'antd';
import { SideBarItem } from '../SideBar';
import { User } from '../User';
import { Calendar } from '../Calendar';

const { Content } = Layout;

function MainLayout({ collapsed }) {
  const [page, setPage] = useState('calendar');

  return (
    <Layout>
      <SideBarItem collapsed={collapsed} setPage={setPage} />
      <Content style={{ margin: '0 16px' }}>
        {page === 'user' && <User />}
        {page === 'calendar' && <Calendar />}
      </Content>
    </Layout>
  );
}

export { MainLayout };

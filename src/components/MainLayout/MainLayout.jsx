import React, { useState, useMemo } from 'react';
import { Layout, Typography } from 'antd';
import { SideBarItem } from '../SideBar';
import { User } from '../User';
import { Calendar } from '../Calendar';
import {
  SecretMiddleware,
  SecretRolesMiddleware,
} from '../../routes/middlewares/privates.middleware';

const { Content } = Layout;

function MainLayout({ collapsed }) {
  const [page, setPage] = useState('calendar');

  const CalendarPage = useMemo(
    () => (
      <SecretMiddleware>
        <Typography.Title level={2}>Расписание</Typography.Title>
        <Calendar />
      </SecretMiddleware>
    ),
    [],
  );

  const UsersPage = useMemo(
    () => (
      <SecretRolesMiddleware>
        <Typography.Title level={2}>Пользователи</Typography.Title>
        <User />
      </SecretRolesMiddleware>
    ),
    [],
  );

  return (
    <Layout>
      <SideBarItem collapsed={collapsed} setPage={setPage} />
      <Content style={{ margin: '0 16px' }}>
        {page === 'user' && UsersPage}
        {page === 'calendar' && CalendarPage}
      </Content>
    </Layout>
  );
}

export { MainLayout };

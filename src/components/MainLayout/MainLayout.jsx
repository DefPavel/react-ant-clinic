import React, { useEffect, useState } from 'react';
import { Layout, Typography, Alert } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { SecretMiddleware, SecretRolesMiddleware } from '../../middlewares/privates.middleware';
import { SideBarItem } from '../SideBar';
import { User } from '../User';
import { Calendar } from '../Calendar';
import { Message } from '../Message';
import { getTodayMessage } from '../../store/actions/message.action';

const { Content } = Layout;

function MainLayout({ collapsed }) {
  const dispatch = useDispatch();
  const { todayMessage: message } = useSelector((store) => store.messageReducer);
  const [page, setPage] = useState('calendar');

  useEffect(() => {
    (async () => {
      await dispatch(getTodayMessage());
    })();
  }, []);

  return (
    <Layout>
      <SideBarItem collapsed={collapsed} setPage={setPage} />
      <Content style={{ margin: '0px 16px 16px 20px' }}>
        {page === 'user' && (
          <SecretRolesMiddleware>
            <Typography.Title level={2}>Пользователи</Typography.Title>
            <User />
          </SecretRolesMiddleware>
        )}
        {page === 'calendar' && (
          <SecretMiddleware>
            <section style={{ display: 'flex', minWidth: '100%' }}>
              <Typography.Title level={2}>Расписание</Typography.Title>
              {message ? (
                <div
                  style={{
                    placeSelf: 'end',
                    margin: '25px 0 15px auto',
                    minWidth: '250px',
                  }}
                >
                  <Alert message={message} closable />{' '}
                </div>
              ) : (
                ''
              )}
            </section>
            <Calendar />
          </SecretMiddleware>
        )}
        {page === 'message' && (
          <SecretRolesMiddleware>
            <Typography.Title level={2}>Сообщения</Typography.Title>
            <Message />
          </SecretRolesMiddleware>
        )}
      </Content>
    </Layout>
  );
}

export { MainLayout };

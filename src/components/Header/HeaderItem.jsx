import React from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ExportOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
import Cookies from 'universal-cookie/es6';
import { Layout, Button, Space } from 'antd';
import Logo from './medical-logo.svg';

const { Header } = Layout;

function HeaderItem({ collapsed = true, setCollapsed = (f) => f }) {
  const exit = async () => {
    const cookies = new Cookies();
    await cookies.remove('user', { path: '/' });
    await cookies.remove('role', { path: '/' });
    await cookies.remove('auth-token', { path: '/' });
    window.location.reload();
  };

  return (
    <Header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '4px 4px 4px 10px',
        borderBottom: '1px solid rgba(0, 0, 0, 0.15)',
        fontWeight: '500',
        backgroundColor: '#ffffff',
        height: '55px',
      }}
    >
      <Space align="center">
        <img
          src={Logo}
          alt="logo"
          style={{ display: 'flex', height: '29px', marginRight: '6px', marginLeft: '20px' }}
        />
        <p>Дерматологическая клиника </p>
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          style={{
            fontSize: '18px',
            width: 60,
            height: 60,
          }}
        />
      </Space>

      <Space>
        <Button
          type="text"
          icon={<ReloadOutlined />}
          onClick={() => window.location.reload()}
          style={{
            fontSize: '18px',
            width: 60,
            height: 60,
          }}
        />
        <Button
          type="text"
          icon={<ExportOutlined />}
          onClick={exit}
          style={{
            fontSize: '18px',
            width: 60,
            height: 60,
          }}
        />
      </Space>
    </Header>
  );
}

export { HeaderItem };

import React from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ExportOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
import Cookies from 'universal-cookie/es6';
import { Layout, Button } from 'antd';

const { Header } = Layout;

function HeaderItem({ collapsed = false, setCollapsed = (f) => f }) {
  const exit = async () => {
    const cookies = new Cookies();
    await cookies.remove('user', { path: '/' });
    await cookies.remove('role', { path: '/' });
    await cookies.remove('auth-token', { path: '/' });
    window.location.reload();
  };

  return (
    <Header style={{ padding: 0, fontWeight: '500', backgroundColor: '#ffffff' }}>
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
    </Header>
  );
}

export { HeaderItem };

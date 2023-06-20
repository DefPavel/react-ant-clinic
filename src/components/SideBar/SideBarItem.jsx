import React from 'react';
import { PieChartOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { NavLink } from 'react-router-dom';
import './SideBar.css';

const { Sider } = Layout;

function SideBarItem({ collapsed = false, selectedKeys = '2' }) {
  return (
    <Sider style={{ backgroundColor: '#ffffff' }} trigger={null} collapsible collapsed={collapsed}>
      <div className="demo-logo-vertical" />
      <Menu
        style={{ marginTop: '10px', fontWeight: '500' }}
        theme="light"
        mode="inline"
        selectedKeys={[selectedKeys]}
        items={[
          {
            key: '1',
            icon: (
              <NavLink to="/">
                <PieChartOutlined style={{ fontSize: '18px' }} />
              </NavLink>
            ),
            label: 'Расписание',
          },
          {
            key: '2',
            icon: (
              <NavLink to="/users">
                <UserOutlined style={{ fontSize: '18px' }} />
              </NavLink>
            ),
            label: 'Пользователи',
          },
        ]}
      />
    </Sider>
  );
}

export { SideBarItem };

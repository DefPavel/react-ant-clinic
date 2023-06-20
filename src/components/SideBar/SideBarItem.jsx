import React from 'react';
import { PieChartOutlined, UserOutlined } from '@ant-design/icons';
import Cookies from 'universal-cookie/es6';
import { Layout, Menu } from 'antd';
import { NavLink } from 'react-router-dom';
import './SideBar.css';

const { Sider } = Layout;

function SideBarItem({ collapsed = false, selectedKeys = '2' }) {
  const cookies = new Cookies();
  const role = cookies.get('role');
  const itemsMenu = [
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
  ];

  return (
    <Sider style={{ backgroundColor: '#ffffff' }} trigger={null} collapsible collapsed={collapsed}>
      <div style={{ display: 'flex' }}>
        <Menu
          style={{ marginTop: '10px', fontWeight: '500', flex: 'auto', minWidth: 0 }}
          theme="light"
          mode="inline"
          items={role === '1' ? itemsMenu : itemsMenu.slice(1)}
        />
      </div>
    </Sider>
  );
}

export { SideBarItem };

import React, { useState } from 'react';
import { PieChartOutlined, UserOutlined } from '@ant-design/icons';
import Cookies from 'universal-cookie/es6';
import { Layout, Menu } from 'antd';
import './SideBar.css';

const { Sider } = Layout;

function SideBarItem({ collapsed = false, setPage = (f) => f }) {
  const [current, setCurrent] = useState('calendar');
  const cookies = new Cookies();
  const role = cookies.get('role');
  const itemsMenu = [
    {
      key: 'calendar',
      icon: <PieChartOutlined style={{ fontSize: '18px' }} />,
      label: 'Расписание',
    },
    {
      key: 'user',
      icon: <UserOutlined style={{ fontSize: '18px' }} />,
      label: 'Пользователи',
    },
  ];

  return (
    <Sider style={{ backgroundColor: '#ffffff' }} trigger={null} collapsible collapsed={collapsed}>
      <div style={{ display: 'flex' }}>
        <Menu
          onClick={(e) => {
            setPage(e.key);
            setCurrent(e.key);
          }}
          style={{ marginTop: '10px', fontWeight: '500', flex: 'auto', minWidth: 0 }}
          theme="light"
          mode="inline"
          selectedKeys={[current]}
          items={role === '1' ? itemsMenu : itemsMenu.slice(0, 1)}
        />
      </div>
    </Sider>
  );
}

export { SideBarItem };

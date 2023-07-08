import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Tag, Space, Row, Button, Typography } from 'antd';
import { getAllUsers, DeleteUser } from '../../store/actions/users.action';
import { SecretRolesMiddleware } from '../../middlewares/privates.middleware';
import { UserForm } from './UserForm';

function User() {
  const dispatch = useDispatch();
  const usersData = useSelector((store) => store.userReducer?.users);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // выдать всех пользователей
    dispatch(getAllUsers());
  }, []);

  const columns = [
    {
      width: 50,
      title: 'Инициалы',
      dataIndex: 'full_name',
      key: 'full_name',
      sorter: (a, b) => a.full_name.length - b.full_name.length,
    },
    {
      width: 40,
      title: 'Логин',
      dataIndex: 'username',
      key: 'username',
      sorter: (a, b) => a.username.length - b.username.length,
    },
    {
      width: 30,
      title: 'Телефон',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      width: 50,
      title: 'Роль',
      dataIndex: 'role',
      key: 'role',
      render: (id, { role }) => (
        <Tag color="geekblue" key={id}>
          {role.toUpperCase()}
        </Tag>
      ),
      sorter: (a, b) => a.role.length - b.role.length,
    },
    {
      width: 30,
      title: 'Цвет',
      dataIndex: 'color',
      key: 'color',
      render: (id, { color }) => (
        <Tag color={color} key={id}>
          {color}
        </Tag>
      ),
    },
    {
      title: 'Действия',
      dataIndex: 'key',
      key: 'key',
      width: 30,
      render: (id) => (
        <Space size="middle">
          <Button
            onClick={async () => {
              await dispatch(DeleteUser(id));
              await dispatch(getAllUsers());
            }}
          >
            Удалить
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <SecretRolesMiddleware>
      <Typography.Title level={2}>Пользователи</Typography.Title>
      <div style={{ padding: 24, minHeight: 360, background: '#ffffff' }}>
        <Row style={{ marginBottom: '1rem', justifyContent: 'end' }}>
          <Button
            style={{ backgroundColor: '#0f7986' }}
            type="primary"
            onClick={() => setIsModalOpen(true)}
          >
            Создать
          </Button>
        </Row>

        <Table dataSource={usersData} columns={columns} scroll={{ x: 800 }} />
        <UserForm isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      </div>
    </SecretRolesMiddleware>
  );
}

export { User };

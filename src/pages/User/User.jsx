import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Tag, Space, Row, Button, Modal } from 'antd';
import { BaseLayout } from '../../components/BaseLayout';
import { getAllUsers, AddUser, DeleteUser } from '../../store/actions/users.action';
import { UserForm } from '../../components/UserForm';

function User() {
  const dispatch = useDispatch();

  const [username, handleUsernameChange] = useState('');
  const [password, handlePasswordChange] = useState('');
  const [fullname, handleFullNameChange] = useState('');
  const [phone, handlePhoneChange] = useState('');
  const [idRole, handleSelectedChange] = useState('');

  const usersData = useSelector((store) => store.userReducer?.users);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = async () => {
    const formData = new FormData();
    formData.append('fullname', fullname);
    formData.append('username', username);
    formData.append('password', password);
    formData.append('phone', phone);
    formData.append('role', idRole);
    await dispatch(AddUser({ formData }));
    await dispatch(getAllUsers());
    setIsModalOpen(false);

    handleUsernameChange('');
    handlePasswordChange('');
    handleFullNameChange('');
    handlePhoneChange('');
    handleSelectedChange('');
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    // выдать всех пользователей
    dispatch(getAllUsers());
  }, []);

  const columns = [
    {
      title: 'Инициалы',
      dataIndex: 'full_name',
      key: 'full_name',
      sorter: (a, b) => a.full_name.length - b.full_name.length,
    },
    {
      title: 'Логин',
      dataIndex: 'username',
      key: 'username',
      sorter: (a, b) => a.username.length - b.username.length,
    },
    {
      title: 'Телефон',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
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
      title: 'Действия',
      dataIndex: 'id',
      key: 'id',
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
    <BaseLayout titleName="Пользователи">
      <div style={{ padding: 24, minHeight: 360, background: '#ffffff' }}>
        <Row style={{ marginBottom: '1rem', justifyContent: 'end' }}>
          <Button style={{ backgroundColor: '#0f7986' }} type="primary" onClick={showModal}>
            Создать
          </Button>
        </Row>

        <Table dataSource={usersData} columns={columns} />
        <Modal
          title="Создать пользователя"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <Button key="back" onClick={handleCancel}>
              Закрыть
            </Button>,
            <Button key="submit" type="primary" onClick={handleOk}>
              Сохранить
            </Button>,
          ]}
        >
          <UserForm
            handleFullNameChange={handleFullNameChange}
            handlePasswordChange={handlePasswordChange}
            handlePhoneChange={handlePhoneChange}
            handleUsernameChange={handleUsernameChange}
            handleSelectedChange={handleSelectedChange}
          />
        </Modal>
      </div>
    </BaseLayout>
  );
}

export { User };

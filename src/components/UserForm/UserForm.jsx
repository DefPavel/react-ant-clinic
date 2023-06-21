import React, { useState } from 'react';
import { Form, Input, Select, Button, Modal } from 'antd';
import { useDispatch } from 'react-redux';
import { getAllUsers, AddUser } from '../../store/actions/users.action';

function UserForm({ isModalOpen, setIsModalOpen = (f) => f }) {
  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState({
    fullname: '',
    username: '',
    password: '',
    phone: '',
    role: '',
  });

  const handleChangeFormValue = (field, val) => {
    setFormValues({ ...formValues, [field]: val });
  };

  const sumbitForm = async () => {
    const formData = new FormData();
    formData.append('fullname', formValues.fullname);
    formData.append('username', formValues.username);
    formData.append('password', formValues.password);
    formData.append('phone', formValues.phone);
    formData.append('role', formValues.role);
    await dispatch(AddUser({ formData }));
    await dispatch(getAllUsers());
    setIsModalOpen(false);
  };

  return (
    <Modal
      title="Создать пользователя"
      open={isModalOpen}
      footer={[
        <Button key="back" type="primary" danger onClick={() => setIsModalOpen(false)}>
          Закрыть
        </Button>,
        <Button
          style={{ backgroundColor: '#0f7986' }}
          key="submit"
          type="primary"
          onClick={sumbitForm}
        >
          Сохранить
        </Button>,
      ]}
    >
      <Form layout="vertical" style={{ maxWidth: 600, marginTop: '3rem' }}>
        <Form.Item label="Ф.И.О.">
          <Input onChange={(e) => handleChangeFormValue('fullname', e.target.value)} />
        </Form.Item>
        <Form.Item label="Логин">
          <Input onChange={(e) => handleChangeFormValue('username', e.target.value)} />
        </Form.Item>
        <Form.Item label="Пароль">
          <Input onChange={(e) => handleChangeFormValue('password', e.target.value)} />
        </Form.Item>
        <Form.Item label="Телефон">
          <Input onChange={(e) => handleChangeFormValue('phone', e.target.value)} />
        </Form.Item>
        <Form.Item label="Роль">
          <Select
            onChange={(e) => handleChangeFormValue('role', e)}
            options={[
              { value: '1', label: 'Администратор' },
              { value: '2', label: 'Врач' },
            ]}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export { UserForm };

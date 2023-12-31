import React, { useState, useEffect } from 'react';
import { Form, Input, Select, Button, Modal, Alert, ColorPicker } from 'antd';
import { useDispatch } from 'react-redux';
import { getAllUsers, AddUser } from '../../../store/actions/users.action';

function UserForm({ isModalOpen, setIsModalOpen = (f) => f }) {
  const dispatch = useDispatch();
  const [error, setError] = useState();
  const [formValues, setFormValues] = useState({
    fullname: '',
    username: '',
    password: '',
    phone: '',
    role: '',
    color: '',
  });

  useEffect(() => {
    setFormValues({
      ...formValues,
      fullname: '',
      username: '',
      password: '',
      phone: '',
      role: '',
      color: '#4096ff',
    });
  }, []);

  useEffect(() => {
    if (error) {
      setError('');
    }
  }, [formValues]);

  const handleChangeFormValue = (field, val) => {
    setFormValues({ ...formValues, [field]: val });
  };

  const closeForm = () => {
    setFormValues({
      fullname: '',
      username: '',
      password: '',
      phone: '',
      role: '',
      color: '#4096ff',
    });
    setIsModalOpen(false);
  };
  const sumbitForm = async () => {
    if (formValues.fullname && formValues.username && formValues.password) {
      const formData = new FormData();
      formData.append('fullname', formValues.fullname);
      formData.append('username', formValues.username);
      formData.append('password', formValues.password);
      formData.append('phone', formValues.phone);
      formData.append('role', formValues.role);
      formData.append('color', formValues.color);
      const res = await dispatch(AddUser({ formData }));
      if (!res?.error) {
        await dispatch(getAllUsers());
        closeForm();
      } else {
        setError(
          <div>
            <Alert
              message={res?.payload}
              type="error"
              showIcon
              closable
              onClose={() => {
                setError('');
              }}
            />
          </div>,
        );
      }
    }
  };

  return (
    <Modal title="Создать пользователя" open={isModalOpen} footer={null} onCancel={closeForm}>
      <Form onFinish={sumbitForm} layout="vertical" style={{ maxWidth: 600, marginTop: '3rem' }}>
        <Form.Item
          required
          rules={[{ required: true, message: 'Пожалуйста, введите ФИО!' }]}
          label="Ф.И.О."
        >
          <Input
            required
            value={formValues.fullname}
            onChange={(e) => handleChangeFormValue('fullname', e.target.value)}
          />
        </Form.Item>
        <Form.Item
          required
          rules={[{ required: true, message: 'Пожалуйста, введите логин!' }]}
          label="Логин"
        >
          <Input
            required
            value={formValues.username}
            onChange={(e) => handleChangeFormValue('username', e.target.value)}
          />
        </Form.Item>
        <Form.Item
          rules={[{ required: true, message: 'Пожалуйста, введите пароль!' }]}
          label="Пароль"
        >
          <Input
            required
            value={formValues.password}
            onChange={(e) => handleChangeFormValue('password', e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Телефон">
          <Input
            value={formValues.phone}
            onChange={(e) => handleChangeFormValue('phone', e.target.value)}
          />
        </Form.Item>
        <Form.Item rules={[{ required: true, message: 'Необходимо выбрать роль!' }]} label="Роль">
          <Select
            required
            value={formValues.role}
            onChange={(e) => handleChangeFormValue('role', e)}
            options={[
              { value: '1', label: 'Администратор' },
              { value: '2', label: 'Врач' },
            ]}
          />
        </Form.Item>
        <Form.Item label="Цвет">
          <ColorPicker
            format="hex"
            value={formValues.color}
            onChange={(e) => handleChangeFormValue('color', e.metaColor.toHexString())}
          />
        </Form.Item>
        <Form.Item>
          <div className="ant-modal-footer">
            <Button key="back" danger onClick={closeForm}>
              Закрыть
            </Button>
            <Button
              style={{ backgroundColor: '#0f7986' }}
              key="submit"
              type="primary"
              htmlType="sumbit"
            >
              Сохранить
            </Button>
          </div>
        </Form.Item>
        {error}
      </Form>
    </Modal>
  );
}

export { UserForm };

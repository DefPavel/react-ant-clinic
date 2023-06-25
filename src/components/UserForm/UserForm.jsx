import React, { useState } from 'react';
import { Form, Input, Select, Button, Modal, Alert } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers, AddUser } from '../../store/actions/users.action';

function UserForm({ isModalOpen, setIsModalOpen = (f) => f }) {
  const dispatch = useDispatch();
  const { error } = useSelector((store) => store.userReducer);
  const [formValues, setFormValues] = useState({
    fullname: '',
    username: '',
    password: '',
    phone: '',
    role: '',
  });

  const errorAlert = error ? (
    <div>
      <Alert message={error} type="error" showIcon closable />
    </div>
  ) : (
    ''
  );

  const handleChangeFormValue = (field, val) => {
    setFormValues({ ...formValues, [field]: val });
  };

  const closeForm = () => {
    setFormValues({});
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
      await dispatch(AddUser({ formData }));
      if (error !== '') await dispatch(getAllUsers());
      // setIsModalOpen(false);
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
          <Input required onChange={(e) => handleChangeFormValue('fullname', e.target.value)} />
        </Form.Item>
        <Form.Item
          required
          rules={[{ required: true, message: 'Пожалуйста, введите логин!' }]}
          label="Логин"
        >
          <Input required onChange={(e) => handleChangeFormValue('username', e.target.value)} />
        </Form.Item>
        <Form.Item
          rules={[{ required: true, message: 'Пожалуйста, введите пароль!' }]}
          label="Пароль"
        >
          <Input required onChange={(e) => handleChangeFormValue('password', e.target.value)} />
        </Form.Item>
        <Form.Item label="Телефон">
          <Input onChange={(e) => handleChangeFormValue('phone', e.target.value)} />
        </Form.Item>
        <Form.Item rules={[{ required: true, message: 'Необходимо выбрать роль!' }]} label="Роль">
          <Select
            required
            onChange={(e) => handleChangeFormValue('role', e)}
            options={[
              { value: '1', label: 'Администратор' },
              { value: '2', label: 'Врач' },
            ]}
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
        {errorAlert}
      </Form>
    </Modal>
  );
}

export { UserForm };

import React, { useState } from 'react';
import { Form, Input, Select, Button, Modal } from 'antd';

function UserForm({ isModalOpen = false, handleOk = (f) => f, handleCancel = (f) => f }) {
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

  return (
    <Modal
      title="Создать пользователя"
      open={isModalOpen}
      onOk={handleOk()}
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
      <Form layout="vertical" style={{ maxWidth: 600, marginTop: '3rem' }}>
        <Form.Item label="ФИО">
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

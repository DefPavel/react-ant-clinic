import React from 'react';
import { Form, Input, Select } from 'antd';

function UserForm({
  handlePasswordChange = (f) => f,
  handleUsernameChange = (f) => f,
  handleFullNameChange = (f) => f,
  handlePhoneChange = (f) => f,
  handleSelectedChange = (f) => f,
}) {
  return (
    <Form
      size="large"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      layout="horizontal"
      style={{ maxWidth: 600, marginTop: '3rem' }}
    >
      <Form.Item label="ФИО">
        <Input onChange={(e) => handleFullNameChange(e.target.value)} />
      </Form.Item>
      <Form.Item label="Логин">
        <Input onChange={(e) => handleUsernameChange(e.target.value)} />
      </Form.Item>
      <Form.Item label="Пароль">
        <Input onChange={(e) => handlePasswordChange(e.target.value)} />
      </Form.Item>
      <Form.Item label="Телефон">
        <Input onChange={(e) => handlePhoneChange(e.target.value)} />
      </Form.Item>
      <Form.Item label="Роль">
        <Select
          onChange={(e) => handleSelectedChange(e)}
          options={[
            { value: '1', label: 'Администратор' },
            { value: '2', label: 'Врач' },
          ]}
        />
      </Form.Item>
    </Form>
  );
}

export { UserForm };

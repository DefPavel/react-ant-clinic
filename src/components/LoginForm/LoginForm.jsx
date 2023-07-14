import React from 'react';
import { Card, Form, Input, Button, Alert, Row, Col } from 'antd';
import Logo from './medical.svg';
import './LoginForm.css';

function LoginForm({
  error = '',
  handlePasswordChange = (f) => f,
  handleUsernameChange = (f) => f,
  handleSubmit = (f) => f,
  loading = false,
}) {
  const errorAlert = error ? (
    <Row>
      <Col span="24">
        <Alert message={error} type="error" showIcon closable />
      </Col>
    </Row>
  ) : (
    ''
  );

  return (
    <Form layout="vertical" className="container" onSubmit={handleSubmit}>
      <Card>
        <Row className="header">
          <img src={Logo} alt="logo" className="logo" />
          <p>Авторизация</p>
          <p>Дерматологическая клиника</p>
        </Row>
        <Row className="body">
          <Form.Item
            label="Логин"
            name="username"
            onChange={(e) => handleUsernameChange(e.target.value)}
            rules={[{ required: true, message: 'Пожалуйста, введите ваш логин!' }]}
          >
            <Input style={{ padding: '10px 12px' }} />
          </Form.Item>

          <Form.Item
            label="Пароль"
            name="password"
            onChange={(e) => handlePasswordChange(e.target.value)}
            rules={[{ required: true, message: 'Пожалуйста, введите ваш пароль!' }]}
          >
            <Input.Password style={{ padding: '10px 12px' }} />
          </Form.Item>

          <Form.Item>
            <Button
              size="large"
              type="primary"
              style={{ backgroundColor: '#0f7986' }}
              htmlType="submit"
              onClick={handleSubmit}
              loading={loading}
            >
              Войти
            </Button>
          </Form.Item>
        </Row>

        {errorAlert}
      </Card>
    </Form>
  );
}

export { LoginForm };

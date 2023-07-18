import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Modal, Alert } from 'antd';
import { useDispatch } from 'react-redux';
import { getAllMessage, createMessage } from '../../../store/actions/message.action';

function MessageForm({ isModalOpen, setIsModalOpen = (f) => f }) {
  const dispatch = useDispatch();
  const [error, setError] = useState();
  const [formValues, setFormValues] = useState({
    name: '',
    dateCrt: '',
  });

  useEffect(() => {
    setFormValues({
      ...formValues,
      name: '',
      dateCrt: '',
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
      name: '',
      dateCrt: '',
    });
    setIsModalOpen(false);
  };
  const sumbitForm = async () => {
    if (formValues.name && formValues.dateCrt) {
      const formData = new FormData();
      formData.append('name', formValues.name);
      formData.append('dateCrt', formValues.dateCrt);
      const res = await dispatch(createMessage({ formData }));
      if (!res?.error) {
        await dispatch(getAllMessage());
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
    <Modal title="Создать новое сообщение" open={isModalOpen} footer={null} onCancel={closeForm}>
      <Form onFinish={sumbitForm} layout="vertical" style={{ maxWidth: 600, marginTop: '3rem' }}>
        <Form.Item
          required
          rules={[{ required: true, message: 'Пожалуйста, введите сообщение!' }]}
          label="Текст сообщения"
        >
          <Input.TextArea
            value={formValues.name}
            onChange={(e) => handleChangeFormValue('name', e.target.value)}
          />
        </Form.Item>
        <Form.Item
          required
          rules={[{ required: true, message: 'Пожалуйста, введите логин!' }]}
          label="Дата"
        >
          <Input
            required
            value={formValues.dateCrt}
            type="date"
            lang="ru"
            onChange={(e) => handleChangeFormValue('dateCrt', e.target.value)}
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
              Создать
            </Button>
          </div>
        </Form.Item>
        {error}
      </Form>
    </Modal>
  );
}

export { MessageForm };

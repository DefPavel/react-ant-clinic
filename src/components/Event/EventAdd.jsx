import React, { useState } from 'react';
import { Form, Input, Select, Modal, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { getAllShedule, addShedule } from '../../store/actions/shedule.action';

function EventAddForm({ doctors = [], isModalOpen = false, setIsModalOpen = (f) => f }) {
  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState({
    doctor: '',
    title: '',
    phone: '',
    date: '',
    time: '',
    description: '',
  });

  const handleChangeFormValue = (field, val) => {
    setFormValues({ ...formValues, [field]: val });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleOk = async () => {
    if (formValues.date && formValues.time) {
      const formData = new FormData();
      formData.append('title', formValues.title);
      formData.append('description', formValues.description);
      formData.append('begin', formValues.date);
      formData.append('time', formValues.time);
      formData.append('phone', formValues.phone);
      await dispatch(addShedule({ formData }));
      await dispatch(getAllShedule());
      setIsModalOpen(false);
    }
  };

  return (
    <Modal title="Создать Событие" onCancel={handleCancel} footer={null} open={isModalOpen}>
      <Form onFinish={handleOk} layout="vertical" style={{ maxWidth: 600, marginTop: '3rem' }}>
        <Form.Item
          rules={[{ required: true, message: 'Пожалуйста, введите ФИО!' }]}
          label="Пациент"
        >
          <Input required onChange={(e) => handleChangeFormValue('title', e.target.value)} />
        </Form.Item>
        <Form.Item label="Доктор">
          <Select
            onChange={(e) => handleChangeFormValue('doctor', e)}
            options={doctors.map((item) => ({
              value: item.key,
              label: item.full_name,
            }))}
          />
        </Form.Item>
        <Form.Item label="Телефон Пациента">
          <Input onChange={(e) => handleChangeFormValue('phone', e.target.value)} />
        </Form.Item>
        <Form.Item rules={[{ required: true, message: 'Пожалуйста, введите дату!' }]} label="Дата">
          <Input
            required
            type="date"
            lang="ru"
            onChange={(e) => handleChangeFormValue('date', e.target.value)}
          />
        </Form.Item>
        <Form.Item
          rules={[{ required: true, message: 'Пожалуйста, введите время!' }]}
          label="Время"
        >
          <Input
            required
            type="time"
            lang="ru"
            min="08:00"
            max="18:00"
            onChange={(e) => handleChangeFormValue('time', e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Описание">
          <Input.TextArea onChange={(e) => handleChangeFormValue('description', e.target.value)} />
        </Form.Item>
        <Form.Item>
          <div className="ant-modal-footer">
            <Button key="back" danger onClick={handleCancel}>
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
      </Form>
    </Modal>
  );
}

export { EventAddForm };

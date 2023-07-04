import React, { useEffect, useState } from 'react';
import { Form, Input, Select, Modal, Button, ColorPicker, Alert } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getAllShedule, addShedule } from '../../store/actions/shedule.action';

function EventAddForm({
  selectDateStr,
  doctors = [],
  isModalOpen = false,
  setIsModalOpen = (f) => f,
  role = '',
}) {
  const dispatch = useDispatch();
  const { error } = useSelector((store) => store.scheduleReducer);
  const [formValues, setFormValues] = useState({
    doctor: '',
    title: '',
    phone: '',
    date: '',
    time: '',
    description: '',
    color: '',
  });

  useEffect(() => {
    setFormValues({
      ...formValues,
      doctor: '',
      title: '',
      phone: '',
      date: selectDateStr || '',
      time: '',
      description: '',
      color: '#4096ff',
    });
  }, [isModalOpen]);

  const handleChangeFormValue = (field, val) => {
    setFormValues({ ...formValues, [field]: val });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const errorAlert = error ? (
    <div>
      <Alert message={error} type="error" showIcon closable />
    </div>
  ) : (
    ''
  );

  const handleOk = async () => {
    if (formValues.date && formValues.time) {
      const formData = new FormData();
      formData.append('title', formValues.title);
      formData.append('description', formValues.description);
      formData.append('begin', formValues.date);
      formData.append('time', formValues.time);
      formData.append('phone', formValues.phone);
      formData.append('color', formValues.color);
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
          <Input
            required
            value={formValues.title}
            onChange={(e) => handleChangeFormValue('title', e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Доктор">
          <Select
            value={formValues.doctor}
            onChange={(e) => handleChangeFormValue('doctor', e)}
            options={doctors.map((item) => ({
              value: item.key,
              label: item.full_name,
            }))}
          />
        </Form.Item>
        <Form.Item label="Телефон Пациента">
          <Input
            value={formValues.phone}
            onChange={(e) => handleChangeFormValue('phone', e.target.value)}
          />
        </Form.Item>
        <Form.Item rules={[{ required: true, message: 'Пожалуйста, введите дату!' }]} label="Дата">
          <Input
            required
            value={formValues.date}
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
            value={formValues.time}
            type="time"
            lang="ru"
            min="08:00"
            max="18:00"
            onChange={(e) => handleChangeFormValue('time', e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Описание">
          <Input.TextArea
            value={formValues.description}
            onChange={(e) => handleChangeFormValue('description', e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Цвет записи">
          <ColorPicker
            format="hex"
            value={formValues.color}
            onChange={(e) => handleChangeFormValue('color', e.metaColor.toHexString())}
          />
        </Form.Item>
        <Form.Item>
          <div className="ant-modal-footer">
            <Button key="back" danger onClick={handleCancel}>
              Закрыть
            </Button>
            <Button
              disabled={role !== '1'}
              style={{ backgroundColor: '#0f7986' }}
              key="submit"
              type="primary"
              htmlType="sumbit"
            >
              Создать
            </Button>
          </div>
        </Form.Item>
        {errorAlert}
      </Form>
    </Modal>
  );
}

export { EventAddForm };

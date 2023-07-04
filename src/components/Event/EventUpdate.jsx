import React, { useEffect, useState } from 'react';
import { Form, Input, Select, Modal, Button, ColorPicker, Alert } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getAllShedule, updateShedule } from '../../store/actions/shedule.action';
import { scheduleReducer } from '../../store/reducers/shedule.reducer';

function EventUpdateForm({
  objectValue,
  doctors = [],
  isModalOpen = false,
  setIsModalOpen = (f) => f,
  role = '',
}) {
  const dispatch = useDispatch();
  const { error } = useSelector((store) => store.scheduleReducer);
  const { clearError } = scheduleReducer.actions;
  const [formValues, setFormValues] = useState({
    id: '',
    doctor: '',
    title: '',
    phone: '',
    date: '',
    time: '',
    description: '',
  });
  useEffect(() => {
    if (error) {
      dispatch(clearError());
    }
  }, [formValues]);

  useEffect(() => {
    setFormValues({
      ...formValues,
      id: objectValue?.id,
      doctor: objectValue?.doctor,
      title: objectValue?.title,
      phone: objectValue?.phone,
      date: objectValue?.date,
      time: objectValue?.time,
      description: objectValue?.description,
      color: objectValue?.color,
    });
  }, [objectValue]);

  const errorAlert =
    error !== '' ? (
      <div>
        <Alert message={error} type="error" showIcon closable />
      </div>
    ) : (
      ''
    );

  const handleChangeFormValue = (field, val) => {
    setFormValues({ ...formValues, [field]: val });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleOk = async () => {
    if (formValues.date && formValues.time) {
      const formData = new FormData();
      formData.append('id', formValues.id);
      formData.append('title', formValues.title);
      formData.append('doctor', formValues.doctor.key);
      formData.append('description', formValues.description);
      formData.append('begin', formValues.date);
      formData.append('time', formValues.time);
      formData.append('phone', formValues.phone);
      formData.append('color', formValues.color);
      await dispatch(updateShedule({ formData }));
      if (error === '') {
        await dispatch(getAllShedule());
        setIsModalOpen(false);
      }
    }
  };

  return (
    <Modal title="Изменить Событие" footer={null} onCancel={handleCancel} open={isModalOpen}>
      <Form onFinish={handleOk} layout="vertical" style={{ maxWidth: 600, marginTop: '3rem' }}>
        <Form.Item
          rules={[{ required: true, message: 'Пожалуйста, введите ФИО!' }]}
          label="Пациент"
        >
          <Input
            value={formValues.title}
            required
            onChange={(e) => handleChangeFormValue('title', e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Доктор">
          <Select
            value={objectValue.doctor}
            defaultValue={objectValue.doctor}
            onChange={(e) => {
              handleChangeFormValue('doctor', { key: e, label: '' });
            }}
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
            value={formValues.date}
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
            value={formValues.time}
            required
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
              Изменить
            </Button>
          </div>
        </Form.Item>
        {errorAlert}
      </Form>
    </Modal>
  );
}

export { EventUpdateForm };

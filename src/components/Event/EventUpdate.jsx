import React, { useEffect, useState } from 'react';
import { Form, Input, Select, Modal, Button, Alert, Checkbox } from 'antd';
import { useDispatch } from 'react-redux';
import { getAllShedule, updateShedule, deleteShedule } from '../../store/actions/shedule.action';

function EventUpdateForm({
  objectValue,
  doctors = [],
  isModalOpen = false,
  setIsModalOpen = (f) => f,
  role = '',
}) {
  const dispatch = useDispatch();
  const [error, setError] = useState();
  const [formValues, setFormValues] = useState({
    id: '',
    doctor: '',
    title: '',
    phone: '',
    date: '',
    time: '',
    description: '',
    isPhone: false,
    isComming: false,
  });
  useEffect(() => {
    if (error) {
      setError('');
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
      isPhone: objectValue?.isPhone,
      isComming: objectValue?.isComming,
    });
  }, [objectValue]);

  const handleChangeFormValue = (field, val) => {
    setFormValues({ ...formValues, [field]: val });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const dropShedule = async () => {
    const res = await dispatch(deleteShedule(formValues.id));
    if (!res?.error) {
      await dispatch(getAllShedule());
      setIsModalOpen(false);
    }
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
      formData.append('isPhone', formValues.isPhone);
      formData.append('isComming', formValues.isComming);
      const res = await dispatch(updateShedule({ formData }));
      if (!res?.error) {
        await dispatch(getAllShedule());
        setIsModalOpen(false);
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
    <Modal title="Изменить Событие" footer={null} onCancel={handleCancel} open={isModalOpen}>
      <Form onFinish={handleOk} layout="vertical" style={{ maxWidth: 600, marginTop: '3rem' }}>
        <Form.Item
          rules={[{ required: true, message: 'Пожалуйста, введите ФИО!' }]}
          label="Инициалы Пациента"
        >
          <Input
            value={formValues.title}
            required
            onChange={(e) => handleChangeFormValue('title', e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Доктор">
          <Select
            value={formValues.doctor}
            defaultValue={objectValue.doctor}
            onChange={(e) => {
              handleChangeFormValue('doctor', {
                key: e,
                label: doctors.find((x) => x.key === e).full_name,
              });
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
        <Form.Item style={{ marginBottom: 0 }}>
          <Form.Item style={{ display: 'inline-block', marginRight: 5 }}>
            <Checkbox
              checked={formValues.isPhone}
              onChange={(e) => handleChangeFormValue('isPhone', e.target.checked)}
            >
              Дозвонились
            </Checkbox>
          </Form.Item>
          <Form.Item style={{ display: 'inline-block' }}>
            <Checkbox
              checked={formValues.isComming}
              onChange={(e) => handleChangeFormValue('isComming', e.target.checked)}
            >
              Пришел
            </Checkbox>
          </Form.Item>
        </Form.Item>
        <Form.Item label="Описание">
          <Input.TextArea
            value={formValues.description}
            onChange={(e) => handleChangeFormValue('description', e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <div className="ant-modal-footer">
            <Button className="headerLeft" key="back" danger onClick={handleCancel}>
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
            <Button disabled={role !== '1'} danger type="primary" onClick={dropShedule}>
              Удалить
            </Button>
          </div>
        </Form.Item>
        {error}
      </Form>
    </Modal>
  );
}

export { EventUpdateForm };

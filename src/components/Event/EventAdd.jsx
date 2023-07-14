import React, { useEffect, useState } from 'react';
import { Form, Input, Select, Modal, Button, Alert, Checkbox } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getAllShedule, getSheduleByDate, addShedule } from '../../store/actions/shedule.action';
import { scheduleReducer } from '../../store/reducers/shedule.reducer';
import { findDateSpace } from '../../utils/findDateSpace';

function EventAddForm({
  selectDateStr,
  doctors = [],
  isModalOpen = false,
  setIsModalOpen = (f) => f,
  role = '',
}) {
  const dispatch = useDispatch();
  const { error } = useSelector((store) => store.scheduleReducer);
  const { clearError } = scheduleReducer.actions;
  const [formValues, setFormValues] = useState({
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
      dispatch(clearError());
    }
  }, [formValues]);

  useEffect(() => {
    setFormValues({
      ...formValues,
      doctor: '',
      title: '',
      phone: '',
      date: selectDateStr || new Date().toISOString().slice(0, 10),
      time: '',
      description: '',
      isPhone: false,
      isComming: false,
    });
  }, [isModalOpen]);

  const handleChangeFormValue = (field, val) => {
    setFormValues({ ...formValues, [field]: val });
  };

  const onDoctorChange = async (e) => {
    let freeTime = false;
    let date = new Date();

    while (freeTime === false) {
      console.log(freeTime);
      const { payload: shedulesByDay } = await dispatch(getSheduleByDate({ id: e, date }));
      const nextDay = new Date(date);

      freeTime = findDateSpace(shedulesByDay.map((el) => el.hire_date.split(' ')[1]).sort(), 1800);
      nextDay.setDate(date.getDate() + 1);
      date = nextDay;
    }

    setFormValues({
      ...formValues,
      doctor: e,
      time: freeTime,
    });
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
      formData.append('doctor', formValues.doctor);
      formData.append('description', formValues.description);
      formData.append('begin', formValues.date);
      formData.append('time', formValues.time);
      formData.append('phone', formValues.phone);
      formData.append('isPhone', formValues.isPhone);
      formData.append('isComming', formValues.isComming);
      const res = await dispatch(addShedule({ formData }));
      if (!res?.error) {
        await dispatch(getAllShedule());
        setIsModalOpen(false);
      }
    }
  };

  return (
    <Modal title="Создать Событие" onCancel={handleCancel} footer={null} open={isModalOpen}>
      <Form onFinish={handleOk} layout="vertical" style={{ maxWidth: 600, marginTop: '3rem' }}>
        <Form.Item
          rules={[{ required: true, message: 'Пожалуйста, введите ФИО!' }]}
          label="Инициалы Пациент"
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
            onChange={(e) => onDoctorChange(e)}
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
        <Form.Item style={{ marginBottom: 0 }}>
          <Form.Item style={{ display: 'inline-block', marginRight: 5 }}>
            <Checkbox onChange={(e) => handleChangeFormValue('isPhone', e.target.checked)}>
              Дозвонились
            </Checkbox>
          </Form.Item>
          <Form.Item style={{ display: 'inline-block' }}>
            <Checkbox onChange={(e) => handleChangeFormValue('isComming', e.target.checked)}>
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

import React, { useState } from 'react';
import { Form, Input, Select } from 'antd';

function EventForm() {
  /* // <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} /> <TimePicker selected={startTime} onChange={(date) => setStartTime(date)} /> */
  const [formValues, setFormValues] = useState({
    title: '',
    phone: '',
    date: '',
    time: '',
    description: '',
  });

  const handleChangeFormValue = (field, val) => {
    setFormValues({ ...formValues, [field]: val });
  };

  return (
    <Form layout="vertical" style={{ maxWidth: 600, marginTop: '3rem' }}>
      <Form.Item label="Пациент">
        <Input onChange={(e) => handleChangeFormValue('title', e.target.value)} />
      </Form.Item>
      <Form.Item label="Доктор">
        <Select
          options={[
            { value: '1', label: 'Какой-то врач' },
            { value: '2', label: 'Какой-то врач' },
          ]}
        />
      </Form.Item>
      <Form.Item label="Телефон Пациента">
        <Input onChange={(e) => handleChangeFormValue('phone', e.target.value)} />
      </Form.Item>
      <Form.Item label="Дата">
        <Input type="date" onChange={(e) => handleChangeFormValue('date', e.target.value)} />
      </Form.Item>
      <Form.Item label="Время">
        <Input type="time" onChange={(e) => handleChangeFormValue('time', e.target.value)} />
      </Form.Item>
      <Form.Item label="Описание">
        <Input.TextArea onChange={(e) => handleChangeFormValue('description', e.target.value)} />
      </Form.Item>
    </Form>
  );
}

export { EventForm };

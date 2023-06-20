import React, { useState } from 'react';
import { Form, Input, Select, DatePicker, TimePicker } from 'antd';

function EventForm({ event }) {
  const [startDate, setStartDate] = useState(event.start);
  const [startTime, setStartTime] = useState(event.time);
  const [title, setTitle] = useState(event.title);
  const [doctor, setDoctor] = useState(event.doctor);
  const [phone, setPhone] = useState(event.phone);
  const [description, setDescription] = useState(event.description);

  /* // <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} /> <TimePicker selected={startTime} onChange={(date) => setStartTime(date)} /> */
  return (
    <Form layout="vertical" style={{ maxWidth: 600, marginTop: '3rem' }}>
      <Form.Item label="Пациент">
        <Input value={title} onChange={(e) => setTitle(e.target.value)} />
      </Form.Item>
      <Form.Item label="Доктор">
        <Select
          options={[
            { value: '1', label: 'Администратор' },
            { value: '2', label: 'Врач' },
          ]}
        />
      </Form.Item>
      <Form.Item label="Телефон Пациента">
        <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
      </Form.Item>
      <Form.Item label="Дата">
        <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
      </Form.Item>
      <Form.Item label="Время">
        <Input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
      </Form.Item>
      <Form.Item label="Описание">
        <Input.TextArea value={description} onChange={(e) => setDescription(e.target.value)} />
      </Form.Item>
    </Form>
  );
}

export { EventForm };

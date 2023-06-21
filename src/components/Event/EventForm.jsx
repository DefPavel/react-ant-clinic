import React from 'react';
import { Form, Input, Select } from 'antd';

function EventForm({
  event,
  setStartDate = (f) => f,
  setStartTime = (f) => f,
  setTitle = (f) => f,
  setPhone = (f) => f,
  setDescription = (f) => f,
}) {
  /* // <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} /> <TimePicker selected={startTime} onChange={(date) => setStartTime(date)} /> */
  return (
    <Form layout="vertical" style={{ maxWidth: 600, marginTop: '3rem' }}>
      <Form.Item label="Пациент">
        <Input value={event.title} onChange={(e) => setTitle(e.target.value)} />
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
        <Input value={event.phone} onChange={(e) => setPhone(e.target.value)} />
      </Form.Item>
      <Form.Item label="Дата">
        <Input type="date" value={event.start} onChange={(e) => setStartDate(e.target.value)} />
      </Form.Item>
      <Form.Item label="Время">
        <Input type="time" value={event.time} onChange={(e) => setStartTime(e.target.value)} />
      </Form.Item>
      <Form.Item label="Описание">
        <Input.TextArea
          value={event.description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Item>
    </Form>
  );
}

export { EventForm };

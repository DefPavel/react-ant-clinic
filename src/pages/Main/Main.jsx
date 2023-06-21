import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button } from 'antd';
import { BaseLayout } from '../../components/BaseLayout';
import { CalendarForm } from '../../components/CalendarForm';
import { EventForm } from '../../components/Event/EventForm';
import { getAllShedule, addShedule } from '../../store/actions/shedule.action';

function Main() {
  const dispatch = useDispatch();
  const scheduleEvents = useSelector((store) => store.scheduleReducer?.schedule);
  useEffect(() => {
    // выдать всех пользователей
    dispatch(getAllShedule());
  }, []);

  // почему-то как только приходит с api на недели и дне fatal error date[("get" + method)] is not a function
  // https://github.com/jquense/react-big-calendar/issues/163

  const [selectedStartDate, setSelectedStartDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [title, setTitle] = useState('');
  const [doctor, setDoctor] = useState('');
  const [phone, setPhone] = useState('');
  const [description, setDescription] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleOk = async () => {
    const dateBegin = selectedStartDate
      ? selectedStartDate.toISOString().slice(0, 10)
      : new Date().toISOString().slice(0, 10);

    const timeBegin = selectedTime
      ? selectedTime.toLocaleTimeString('ru-RU', {
          hour: '2-digit',
          minute: '2-digit',
        })
      : new Date().toLocaleTimeString('ru-RU', {
          hour: '2-digit',
          minute: '2-digit',
        });
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('begin', dateBegin);
    formData.append('time', timeBegin);
    formData.append('phone', phone);
    await dispatch(addShedule({ formData }));
    await dispatch(getAllShedule());
    setIsModalOpen(false);
  };

  return (
    <BaseLayout titleName="Расписание">
      <div style={{ padding: 24, minHeight: 360, background: '#ffffff' }}>
        <CalendarForm
          setSelectedStartDate={setSelectedStartDate}
          setIsModalOpen={setIsModalOpen}
          allEvents={scheduleEvents}
        />
        <Modal
          title="Создать пользователя"
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <Button key="back" onClick={handleCancel}>
              Закрыть
            </Button>,
            <Button key="submit" type="primary" onClick={handleOk}>
              Сохранить
            </Button>,
          ]}
          open={isModalOpen}
        >
          <EventForm
            event={{
              start: new Date().toISOString().slice(0, 16).replace('T', ' '),
              end: new Date().toISOString().slice(0, 16).replace('T', ' '),
              time: new Date().toLocaleTimeString('ru-RU', {
                hour: '2-digit',
                minute: '2-digit',
              }),
              title,
              doctor: '',
              phone,
              description,
            }}
            setDescription={setDescription}
            setPhone={setPhone}
            setStartDate={setSelectedStartDate}
            setStartTime={setSelectedTime}
            setTitle={setTitle}
          />
        </Modal>
      </div>
    </BaseLayout>
  );
}

export { Main };

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

  const events = [
    {
      title: 'Врач1 - Петренко Н.В. \n пациент',
      start: new Date('2023-05-28T10:00:00'),
      end: new Date('2023-05-28T13:00:00'),
    },
    {
      title: 'Врач2 - Петренко Н.В. \n пациент',
      start: new Date('2023-05-28T10:00:00'),
      end: new Date('2023-05-28T13:00:00'),
    },
    {
      title: 'Врач3 - Петренко Н.В. \n пациент',
      start: new Date('2023-05-28T10:00:00'),
      end: new Date('2023-05-28T13:00:00'),
    },
    {
      title: 'Врач4 - Петренко Н.В. \n пациент',
      start: new Date('2023-05-28T10:00:00'),
      end: new Date('2023-05-28T13:00:00'),
    },
  ];

  const [selectedStartDate, setSelectedStartDate] = useState(new Date());
  const [selectedEndDate, setSelectedEndDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };

  return (
    <BaseLayout titleName="Расписание">
      <div style={{ padding: 24, minHeight: 360, background: '#ffffff' }}>
        <CalendarForm
          setSelectedStartDate={setSelectedStartDate}
          setSelectedEndDate={setSelectedEndDate}
          setIsModalOpen={setIsModalOpen}
          allEvents={events}
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
              start: selectedStartDate,
              end: selectedEndDate,
              title: '',
              doctor: '',
              phone: '',
              description: '',
            }}
          />
        </Modal>
      </div>
    </BaseLayout>
  );
}

export { Main };

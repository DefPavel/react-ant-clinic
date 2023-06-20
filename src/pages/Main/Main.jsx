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

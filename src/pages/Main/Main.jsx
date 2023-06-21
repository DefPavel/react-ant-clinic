import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button } from 'antd';
import { getAllShedule, addShedule } from '../../store/actions/shedule.action';
import { EventForm } from '../../components/Event/EventForm';
import { BaseLayout } from '../../components/BaseLayout';
import { CalendarForm } from '../../components/CalendarForm/CalendarForm';

function Main() {
  const dispatch = useDispatch();
  const scheduleEvents = useSelector((store) => store.scheduleReducer?.schedule);
  useEffect(() => {
    // выдать всех пользователей
    dispatch(getAllShedule());
  }, []);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleOk = async () => {
    const formData = new FormData();
    // formData.append('title', title);
    // formData.append('description', description);
    // formData.append('begin', dateBegin);
    // formData.append('time', timeBegin);
    // formData.append('phone', phone);
    await dispatch(addShedule({ formData }));
    await dispatch(getAllShedule());
    setIsModalOpen(false);
  };

  return (
    <BaseLayout titleName="Расписание">
      <div style={{ padding: 24, minHeight: 360, background: '#ffffff' }}>
        <CalendarForm allEvents={scheduleEvents} />
        <Modal
          title="Создать Событие"
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
          <EventForm />
        </Modal>
      </div>
    </BaseLayout>
  );
}

export { Main };

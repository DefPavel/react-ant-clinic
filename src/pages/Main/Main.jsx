import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllShedule, GetDoctors } from '../../store/actions/shedule.action';
import { BaseLayout } from '../../components/BaseLayout';
import { CalendarForm } from '../../components/CalendarForm/CalendarForm';
import { EventForm } from '../../components/Event/EventForm';

function Main() {
  const dispatch = useDispatch();
  const scheduleEvents = useSelector((store) => store.scheduleReducer?.schedule);
  const doctors = useSelector((store) => store.scheduleReducer?.doctors);
  useEffect(() => {
    // выдать всех пользователей
    dispatch(getAllShedule());
    dispatch(GetDoctors());
  }, []);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <BaseLayout titleName="Расписание">
      <div style={{ padding: 24, minHeight: 360, background: '#ffffff' }}>
        <CalendarForm
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          allEvents={scheduleEvents}
        />
        <EventForm doctors={doctors} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      </div>
    </BaseLayout>
  );
}

export { Main };

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllShedule, GetDoctors } from '../../store/actions/shedule.action';
import { BaseLayout } from '../../components/BaseLayout';
import { CalendarForm } from '../../components/CalendarForm/CalendarForm';
import { EventAddForm } from '../../components/Event/EventAdd';
import { EventUpdateForm } from '../../components/Event/EventUpdate';

function Main() {
  const dispatch = useDispatch();
  const scheduleEvents = useSelector((store) => store.scheduleReducer?.schedule);
  const doctors = useSelector((store) => store.scheduleReducer?.doctors);
  useEffect(() => {
    // выдать всех пользователей
    dispatch(getAllShedule());
    dispatch(GetDoctors());
  }, []);
  const [isModalOpen, setIsModalAddOpen] = useState(false);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [selectDateStr, setSelectDate] = useState('');
  const [objectEvent, setobjectEvent] = useState({
    doctor: '',
    title: '',
    phone: '',
    date: '',
    time: '',
    description: '',
  });

  return (
    <BaseLayout titleName="Расписание">
      <div style={{ padding: 24, minHeight: 360, background: '#ffffff' }}>
        <CalendarForm
          isModalOpen={isModalOpen}
          setIsModalAddOpen={setIsModalAddOpen}
          allEvents={scheduleEvents}
          callbackOnselect={(dateSelect) => {
            setSelectDate(dateSelect);
            setIsModalAddOpen(true);
          }}
          callbackEventselect={(objectValue) => {
            setobjectEvent({
              doctor: objectValue.doctor,
              title: objectValue.title,
              phone: objectValue.phone,
              date: objectValue.date,
              time: objectValue.time,
              description: objectValue.description,
            });
            setIsModalUpdateOpen(true);
          }}
        />
        {/* Открыть модальное окно для создания события */}
        <EventAddForm
          selectDateStr={selectDateStr}
          doctors={doctors}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalAddOpen}
        />
        {/* Открыть модальное окно для изменения уже существующего события */}
        <EventUpdateForm
          objectValue={objectEvent}
          doctors={doctors}
          isModalOpen={isModalUpdateOpen}
          setIsModalOpen={setIsModalUpdateOpen}
        />
      </div>
    </BaseLayout>
  );
}

export { Main };

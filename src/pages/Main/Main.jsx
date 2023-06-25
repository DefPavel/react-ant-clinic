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
  // const [selectDateStr, setSelectDate] = useState('');

  return (
    <BaseLayout titleName="Расписание">
      <div style={{ padding: 24, minHeight: 360, background: '#ffffff' }}>
        <CalendarForm
          isModalOpen={isModalOpen}
          setIsModalAddOpen={setIsModalAddOpen}
          allEvents={scheduleEvents}
          callbackOnselect={(dateSelect) => {
            console.log(dateSelect);
            // setSelectDate(dateSelect);
            // console.log(selectDateStr);
            // setIsModalAddOpen(true);
          }}
          callbackEventselect={(objectValue) => {
            console.log(objectValue);
            // setIsModalUpdateOpen(true);
          }}
        />
        {/* Открыть модальное окно для создания события */}
        <EventAddForm
          doctors={doctors}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalAddOpen}
        />
        {/* Открыть модальное окно для изменения уже существующего события */}
        <EventUpdateForm
          doctors={doctors}
          isModalOpen={isModalUpdateOpen}
          setIsModalOpen={setIsModalUpdateOpen}
        />
      </div>
    </BaseLayout>
  );
}

export { Main };

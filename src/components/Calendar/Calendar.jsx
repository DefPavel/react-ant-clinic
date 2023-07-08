import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography } from 'antd';
import Cookies from 'universal-cookie/es6';
import { getAllShedule, GetDoctors } from '../../store/actions/shedule.action';
import { ColorfulSelect } from '../ColorfulSelect';
import { CalendarForm } from './CalendarForm';
import { EventAddForm } from '../Event/EventAdd';
import { EventUpdateForm } from '../Event/EventUpdate';
import { SecretMiddleware } from '../../middlewares/privates.middleware';

function Calendar() {
  const dispatch = useDispatch();
  const scheduleEvents = useSelector((store) => store.scheduleReducer?.schedule);
  const doctors = useSelector((store) => store.scheduleReducer?.doctors);
  useEffect(() => {
    // выдать всех пользователей
    dispatch(getAllShedule());
    dispatch(GetDoctors());
  }, []);
  const cookies = new Cookies();
  const role = cookies.get('role');
  const [isModalOpen, setIsModalAddOpen] = useState(false);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [selectDateStr, setSelectDate] = useState('');
  const [objectEvent, setobjectEvent] = useState({
    id: '',
    doctor: '',
    title: '',
    phone: '',
    date: '',
    time: '',
    description: '',
    color: '',
    isPhone: false,
    isComming: false,
  });

  const onSelect = useCallback((dateSelect) => {
    setSelectDate(dateSelect);
    setIsModalAddOpen(true);
  }, []);

  const onEventSelect = useCallback((objectValue) => {
    setobjectEvent({
      id: objectValue.id,
      doctor: { key: objectValue.doctor_id, label: objectValue.doctor },
      title: objectValue.title,
      phone: objectValue.phone,
      date: objectValue.date,
      time: objectValue.time,
      description: objectValue.description,
      color: objectValue.color,
      isPhone: objectValue.isPhone,
      isComming: objectValue.isComming,
    });
    setIsModalUpdateOpen(true);
  }, []);

  return (
    <SecretMiddleware>
      <Typography.Title level={2}>Расписание</Typography.Title>
      <ColorfulSelect
        options={doctors.map((el) => ({
          label: el.full_name,
          value: el.key,
          color: el.color,
          checked: el.status,
        }))}
      />
      <div style={{ padding: 24, minHeight: 360, background: '#ffffff' }}>
        <CalendarForm
          isModalOpen={isModalOpen}
          setIsModalAddOpen={setIsModalAddOpen}
          allEvents={scheduleEvents}
          callbackOnselect={onSelect}
          setSelectDate={setSelectDate}
          callbackEventselect={onEventSelect}
        />
        {/* Открыть модальное окно для создания события */}
        <EventAddForm
          selectDateStr={selectDateStr}
          doctors={doctors}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalAddOpen}
          role={role}
        />
        {/* Открыть модальное окно для изменения уже существующего события */}
        <EventUpdateForm
          objectValue={objectEvent}
          doctors={doctors}
          isModalOpen={isModalUpdateOpen}
          setIsModalOpen={setIsModalUpdateOpen}
          role={role}
        />
      </div>
    </SecretMiddleware>
  );
}

export { Calendar };

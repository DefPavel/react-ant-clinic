import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/ru';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { EventPopover } from '../Event/EventPopover';

function CalendarForm({
  allEvents,
  setSelectedStartDate = (f) => f,
  setSelectedEndDate = (f) => f,
  setIsModalOpen = (f) => f,
}) {
  const localizer = momentLocalizer(moment);
  return (
    <div className="calendar">
      <div>
        <Calendar
          style={{ height: '500px' }}
          events={allEvents}
          localizer={localizer}
          startAccessor="start"
          endAccessor="end"
          defaultView="week"
          messages={{
            next: 'След.',
            previous: 'Пред.',
            today: 'Текущая',
            month: 'Месяц',
            week: 'Неделя',
            day: 'День',
            agenda: 'Таблица',
            date: 'Дата',
            time: 'Время',
            event: 'Событие',
          }}
          components={{ event: EventPopover }}
          selectable
          onSelectSlot={({ start, end }) => {
            setSelectedStartDate(start);
            setSelectedEndDate(end);
            setIsModalOpen(true);
          }}
        />
      </div>
    </div>
  );
}

export { CalendarForm };

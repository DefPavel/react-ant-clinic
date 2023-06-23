import React from 'react';
import Fullcalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import './Calendar.css';

function CalendarForm({ allEvents = [], setIsModalOpen = (f) => f, callbackOnselect = (f) => f }) {
  return (
    <div className="calendar">
      <div>
        <Fullcalendar
          timeZone="UTC"
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
          initialView="dayGridMonth"
          buttonIcons
          navLinks
          dayMaxEvents
          selectable
          select={({ startStr, endStr }) => callbackOnselect(startStr, endStr)}
          eventClick={(info) => alert(info.event.extendedProps.doctor)}
          events={allEvents}
          headerToolbar={{
            start: 'today,dayGridMonth,listWeek',
            center: 'title',
            end: 'new prevYear,prev,next,nextYear',
          }}
          customButtons={{
            new: {
              text: 'Запись',
              click: () => setIsModalOpen(true),
            },
          }}
          buttonText={{
            today: 'Сегодня',
            month: 'Месяц',
            list: 'Список',
          }}
          height="500px"
          locale="ru"
        />
      </div>
    </div>
  );
}

export { CalendarForm };

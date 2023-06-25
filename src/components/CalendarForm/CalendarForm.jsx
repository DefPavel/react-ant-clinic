import React from 'react';
import Fullcalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import './Calendar.css';

function CalendarForm({
  allEvents = [],
  setIsModalAddOpen = (f) => f,
  callbackOnselect = (f) => f,
  callbackEventselect = (f) => f,
}) {
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
          select={({ startStr }) => callbackOnselect(startStr)}
          eventClick={(info) => callbackEventselect(info.event.extendedProps)}
          events={allEvents}
          headerToolbar={{
            start: 'today,dayGridMonth,listWeek',
            center: 'title',
            end: 'new prevYear,prev,next,nextYear',
          }}
          customButtons={{
            new: {
              text: 'Запись',
              click: () => setIsModalAddOpen(true),
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

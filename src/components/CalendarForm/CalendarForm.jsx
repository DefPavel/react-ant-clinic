import React from 'react';
import Fullcalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import './Calendar.css';

function CalendarForm({ allEvents }) {
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
          eventClick={(info) => alert(info.event.startStr)}
          events={allEvents}
          headerToolbar={{
            start: 'today,dayGridMonth,listWeek',
            center: 'title',
            end: 'prevYear,prev,next,nextYear',
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

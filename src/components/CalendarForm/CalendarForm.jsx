import React from 'react';
import Fullcalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import './Calendar.css';

function CalendarForm({
  allEvents = [],
  setSelectDate = (f) => f,
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
          initialView="timeGridDay"
          buttonIcons
          navLinks
          dayMaxEvents
          selectable
          businessHours={{
            // days of week. an array of zero-based day of week integers (0=Sunday)
            daysOfWeek: [1, 2, 3, 4], // Monday - Thursday
            startTime: '08:00', // a start time
            endTime: '17:00', // an end time
          }}
          select={({ startStr }) => callbackOnselect(startStr)}
          eventClick={(info) => {
            callbackEventselect({
              id: info.event.id,
              date: info.event.startStr.split('T')[0],
              ...info.event.extendedProps,
              color: info.event.backgroundColor,
              title: info.event.title,
            });
          }}
          events={allEvents}
          headerToolbar={{
            start: 'today,dayGridMonth,timeGridWeek,timeGridDay',
            center: 'title',
            end: 'new prevYear,prev,next,nextYear',
          }}
          customButtons={{
            new: {
              text: 'Запись',
              click: () => {
                setIsModalAddOpen(true);
                setSelectDate(null);
              },
            },
          }}
          buttonText={{
            today: 'Сегодня',
            month: 'Месяц',
            week: 'Неделя',
            day: 'День',
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

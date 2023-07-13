import React from 'react';
import Fullcalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import ruLocale from '@fullcalendar/core/locales/ru';
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
          slotEventOverlap={false}
          handleWindowResize
          selectable
          slotMinTime="08:00:00"
          slotMaxTime="23:00:00"
          firstDay={1}
          weekends
          locale={ruLocale}
          businessHours={{
            // Интервал даты !!!!
            //  slotDuration="00:10:00"
            // slotLabelInterval="00:10:00"
            // days of week. an array of zero-based day of week integers (0=Sunday)
            // daysOfWeek: [1, 2, 3, 4, 5], // Monday - Thursday
            startTime: '08:00', // a start time
            endTime: '23:00', // an end time
          }}
          select={({ startStr }) => {
            const date = new Date(startStr).toISOString().slice(0, 10);
            callbackOnselect(date);
          }}
          eventClick={(info) => {
            callbackEventselect({
              id: info.event.id,
              date: info.event.startStr.split('T')[0],
              ...info.event.extendedProps,
              color: info.event.color,
              title: info.event.title,
            });
          }}
          events={allEvents}
          headerToolbar={{
            start: 'today,dayGridMonth,timeGridWeek,timeGridDay',
            center: 'title',
            end: 'new,prevYear,prev,next,nextYear',
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
        />
      </div>
    </div>
  );
}

export { CalendarForm };

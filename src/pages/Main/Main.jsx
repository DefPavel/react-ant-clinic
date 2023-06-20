import React, { useState } from 'react';
import { BaseLayout } from '../../components/BaseLayout';
import { CalendarForm } from '../../components/CalendarForm';

function Main() {
  const events = [
    {
      title: 'Врач1 - Петренко Н.В. \n пациент',
      start: new Date('2023-05-28T10:00:00'),
      end: new Date('2023-05-28T13:00:00'),
    },
    {
      title: 'Врач2 - Петренко Н.В. \n пациент',
      start: new Date('2023-05-28T10:00:00'),
      end: new Date('2023-05-28T13:00:00'),
    },
    {
      title: 'Врач3 - Петренко Н.В. \n пациент',
      start: new Date('2023-05-28T10:00:00'),
      end: new Date('2023-05-28T13:00:00'),
    },
    {
      title: 'Врач4 - Петренко Н.В. \n пациент',
      start: new Date('2023-05-28T10:00:00'),
      end: new Date('2023-05-28T13:00:00'),
    },
  ];
  const [allEvents, setAllEvents] = useState(events);
  const [selectedStartDate, setSelectedStartDate] = useState(new Date());
  const [selectedEndDate, setSelectedEndDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <BaseLayout titleName="Расписание">
      <div style={{ padding: 24, minHeight: 360, background: '#ffffff' }}>
        <CalendarForm
          setSelectedStartDate={setSelectedStartDate}
          setSelectedEndDate={setSelectedEndDate}
          setIsModalOpen={setIsModalOpen}
          allEvents={allEvents}
        />
      </div>
    </BaseLayout>
  );
}

export { Main };

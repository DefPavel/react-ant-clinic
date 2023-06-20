import { Popover } from 'antd';
import { EventForm } from './EventForm';

function EventPopover({ event }) {
  // eslint-disable-next-line react/react-in-jsx-scope
  return <Popover content={<EventForm event={event} />}>{event.title}</Popover>;
}

export { EventPopover };

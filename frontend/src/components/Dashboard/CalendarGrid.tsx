import React, { useEffect, useState } from 'react';
import { Calendar, Badge, theme } from 'antd';
import type { CalendarProps } from 'antd';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import "../../styles/Dashboard/CalendarGrid.css";

const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>['mode']) => {
  console.log(value.format('YYYY-MM-DD'), mode);
};

const CalendarGrid: React.FC = () => {
  const { token } = theme.useToken();
  const [events, setEvents] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const userId = JSON.parse(localStorage.getItem('userData') || '{}').userId;
      const response = await fetch(`http://localhost:3000/events/byCreator/${userId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch events');
      }
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const getListData = (value: Dayjs) => {
    const eventsForDate = events.filter(event => dayjs(event.startDate).isSame(value, 'day'));
    return eventsForDate.length > 0 ? [{ type: 'default', content: `${eventsForDate.length} events` }] : [];
  };

  const dateCellRender = (value: Dayjs) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item, index) => (
          <li key={index}>
            <Badge status={item.type as 'success'} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };

  const onSelect = (value: Dayjs) => {
    navigate('/personal-calendar')
  }
  const wrapperStyle: React.CSSProperties = {
    width: '100%',
    maxWidth: 535,
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
    margin: '0 auto',
  };

  return (
    <div className="calendarWrapper" style={wrapperStyle}>
      <Calendar fullscreen={false} onPanelChange={onPanelChange} dateCellRender={dateCellRender} onSelect={onSelect}/>
    </div>
  );
};

export default CalendarGrid;

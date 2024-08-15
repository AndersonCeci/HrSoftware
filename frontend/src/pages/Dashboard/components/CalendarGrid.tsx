/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { Calendar, Badge, theme } from "antd";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import "../../../styles/Dashboard/CalendarGrid.css";

interface Event {
  id: string;
  startDate: string;
  // Add other properties as needed
}

const CalendarGrid: React.FC = () => {
  const { token } = theme.useToken();
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const navigate = useNavigate();

  const fetchEventsByCriteria = async (
    endpoint: string,
    userId: string,
  ): Promise<Event[]> => {
    try {
      const response = await fetch(
        `http://localhost:3000/events/${endpoint}/${userId}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        },
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || `Failed to fetch ${endpoint} events`);
      }
      return data;
    } catch (error) {
      console.error(`Error fetching ${endpoint} events:`, error);
      return [];
    }
  };

  useEffect(() => {
    const fetchAllEvents = async () => {
      const userId = JSON.parse(
        localStorage.getItem("userData") || "{}",
      ).userId;
      const [creatorEvents, inviteeEvents] = await Promise.all([
        fetchEventsByCriteria("byCreator", userId),
        fetchEventsByCriteria("invitee", userId),
      ]);
      setAllEvents([...creatorEvents, ...inviteeEvents]);
    };

    fetchAllEvents();
  }, []);

  const getListData = (value: Dayjs) => {
    const eventsForDate = allEvents.filter((event) =>
      dayjs(event.startDate).isSame(value, "day"),
    );
    return eventsForDate.length > 0 ? [{ type: "default" }] : [];
  };

  const cellRender = (value: Dayjs) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item, index) => (
          <li key={index}>
            <Badge status={item.type as "success"} />
          </li>
        ))}
      </ul>
    );
  };

  const onSelect = (value: Dayjs) => {
    navigate("/personal-calendar");
  };

  const wrapperStyle: React.CSSProperties = {
    width: "100%",
    maxWidth: 535,
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
    margin: "0 auto",
  };

  return (
    <div className="calendarWrapper" style={wrapperStyle}>
      <Calendar
        fullscreen={false}
        onPanelChange={(value, mode) =>
          console.log(value.format("YYYY-MM-DD"), mode)
        }
        cellRender={cellRender}
        onSelect={onSelect}
      />
    </div>
  );
};

export default CalendarGrid;

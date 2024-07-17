import React, { useEffect, useState } from "react";
import "../styles/PersonalCalendarPage/PersonalCalendar.css";
import {
  Badge,
  Calendar,
  Drawer,
  Space,
  Modal,
  Input,
  DatePicker,
  Typography,
  TimePicker,
  Card,
  Avatar,
  Divider,
  Button,
} from "antd";
import dayjs, { Dayjs } from "dayjs";
import {
  EnvironmentOutlined,
  DeleteOutlined,
  EditOutlined,
  StopOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import TableHeader from "../components/Table/TableHeader";
import Meta from "antd/es/card/Meta";

const { TextArea } = Input;
const { Title } = Typography;
const format = "HH:mm";

export enum Status {
  Cancelled = "cancelled",
  Finished = "finished",
  Ongoing = "ongoing",
  Upcoming = "upcoming",
}

interface NewEvent {
  title: string;
  description: string;
  startDate: Dayjs | null;
  endDate: Dayjs | null;
  startTime: Dayjs | null;
  endTime: Dayjs | null;
  location: string;
}

const PersonalCalendarPage: React.FC = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEvent, setNewEvent] = useState<NewEvent>({
    title: "",
    description: "",
    startDate: null,
    endDate: null,
    startTime: null,
    endTime: null,
    location: "",
  });
  const [editEventId, setEditEventId] = useState<string | null>(null);

  const placement = "bottom";

  useEffect(() => {
    fetchEvents();
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setEditEventId(null); // Clear edit event ID when modal closes
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewEvent((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange =
    (field: keyof NewEvent) => (date: Dayjs | null, dateString: string | string[]) => {
      setNewEvent((prev) => ({ ...prev, [field]: date }));
    };

  const handleTimeChange =
    (field: keyof NewEvent) => (time: Dayjs, timeString: string | string[]) => {
      setNewEvent((prev) => ({ ...prev, [field]: time }));
    };

  const fetchEvents = async () => {
    try {
      const userId = JSON.parse(
        localStorage.getItem("userData") || "{}"
      ).userId;
      const response = await fetch(
        `http://localhost:3000/events/byCreator/${userId}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();
      console.log("Fetched events:", data);
      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch events");
      }
      const updatedEvents = data.map(updateEventStatus);
      setEvents(updatedEvents);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const updateEventStatus = (event: any) => {
    const currentDate = dayjs();
    const eventStartDate = dayjs(event.startDate);
    if (event.status !== Status.Cancelled) {
      if (eventStartDate.isBefore(currentDate, 'day')) {
        event.status = Status.Finished;
      } else if (eventStartDate.isSame(currentDate, 'day')) {
        event.status = Status.Ongoing;
      } else {
        event.status = Status.Upcoming;
      }
    }
    return event;
  };

  const addNewEvent = async () => {
    try {
      const userId = JSON.parse(localStorage.getItem("userData") || "{}").userId;
      const response = await fetch(`http://localhost:3000/events`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newEvent,
          startDate: newEvent.startDate?.format('YYYY-MM-DD'),
          endDate: newEvent.endDate?.format('YYYY-MM-DD'),
          startTime: newEvent.startTime?.toISOString(),
          endTime: newEvent.endTime?.toISOString(),
          location: newEvent.location,
          creatorId: userId,
        }),
      });
      const data = await response.json();
      console.log("Added event:", data);
      if (!response.ok) {
        throw new Error(data.message || "Failed to add event");
      }
      const updatedEvent = updateEventStatus(data);
      setEvents((prev) => [...prev, updatedEvent]);
      setIsModalOpen(false);
      setNewEvent({
        title: "",
        description: "",
        startDate: null,
        endDate: null,
        startTime: null,
        endTime: null,
        location: "",
      });
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };

  const handleDeleteEvent = async (eventId: string) => {
    try {
      const response = await fetch(`http://localhost:3000/events/${eventId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      console.log("Deleted event:", data);
      if (!response.ok) {
        throw new Error(data.message || "Failed to delete event");
      }
      setEvents((prev) => prev.filter((event) => event._id !== eventId));
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  const handleCancelEvent = async (eventId: string) => {
    try {
      const response = await fetch(`http://localhost:3000/events/${eventId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: Status.Cancelled }),
      });
      const data = await response.json();
      console.log("Cancelled event:", data);
      if (!response.ok) {
        throw new Error(data.message || "Failed to cancel event");
      }
      const updatedEvents = events.map((event) =>
        event._id === eventId ? { ...event, status: Status.Cancelled } : event
      );
      setEvents(updatedEvents);
    } catch (error) {
      console.error("Error cancelling event:", error);
    }
  };

  const handleEditEvent = (eventId: string) => {
    const eventToEdit = events.find((event) => event._id === eventId);
    if (eventToEdit) {
      setEditEventId(eventId);
      setNewEvent({
        title: eventToEdit.title,
        description: eventToEdit.description,
        startDate: dayjs(eventToEdit.startDate),
        endDate: dayjs(eventToEdit.endDate),
        startTime: dayjs(eventToEdit.startTime),
        endTime: dayjs(eventToEdit.endTime),
        location: eventToEdit.location,
      });
      showModal();
    }
  };

  const handleSaveEdit = async () => {
    try {
      if (!editEventId) return;
      const response = await fetch(`http://localhost:3000/events/${editEventId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newEvent.title,
          description: newEvent.description,
          startDate: newEvent.startDate?.format('YYYY-MM-DD'),
          endDate: newEvent.endDate?.format('YYYY-MM-DD'),
          startTime: newEvent.startTime?.toISOString(),
          endTime: newEvent.endTime?.toISOString(),
          location: newEvent.location,
        }),
      });
      const data = await response.json();
      console.log("Updated event:", data);
      if (!response.ok) {
        throw new Error(data.message || "Failed to update event");
      }
      const updatedEvents = events.map((event) =>
        event._id === editEventId ? { ...event, ...data } : event
      );
      setEvents(updatedEvents);
      setIsModalOpen(false);
      setEditEventId(null);
      setNewEvent({
        title: "",
        description: "",
        startDate: null,
        endDate: null,
        startTime: null,
        endTime: null,
        location: "",
      });
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  const getListData = (value: Dayjs) => {
    const eventsForDate = events.filter((event) => {
      const eventDate = dayjs(event.startDate);
      return (
        eventDate.date() === value.date() &&
        eventDate.month() === value.month()
      );
    });

    const listData = eventsForDate.map((event) => {
      let type: "error" | "success" | "warning" | "default" = "warning";
      if (event.status === Status.Cancelled) type = "error";
      if (event.status === Status.Finished) type = "success";
      if (event.status === Status.Ongoing) type = "warning";
      if (event.status === Status.Upcoming) type = "default";

      return {
        type: type,
        content: event.title,
      };
    });

    return listData || [];
  };

  const getMonthData = (value: Dayjs) => {
    if (value.month() === 8) {
      return 1394;
    }
  };

  const monthCellRender = (value: Dayjs) => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };

  const dateCellRender = (value: Dayjs) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item, index) => (
          <li key={index}>
            <Badge
              status={
                item.type === "default"
                  ? "default"
                  : (item.type as "warning" | "success" | "error")
              }
              text={item.content}
            />
          </li>
        ))}
      </ul>
    );
  };

  const cellRender = (current: Dayjs, info: { type: string }) => {
    if (info.type === "date") return dateCellRender(current);
    if (info.type === "month") return monthCellRender(current);
    return null;
  };

  const showDrawer = (value: Dayjs) => {
    setSelectedDate(value);
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
    setSelectedDate(null);
  };

  const formatDate = (isoDateString: string) => {
    const date = new Date(isoDateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const formatTime = (isoDateString: string) => {
    const date = new Date(isoDateString);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  return (
    <>
      <Space>
        <section className="calendar-container">
          <TableHeader title="Personal Calendar" onClick={showModal} />
          <Calendar cellRender={cellRender} onSelect={showDrawer} />
        </section>
        <Drawer
          placement={placement}
          closable={false}
          onClose={onClose}
          visible={open}
          key={placement}
          className="drawer-container"
        >
          <h2>Events on {selectedDate?.format("DD-MM-YYYY")}</h2>
          {events.length > 0 &&
            selectedDate &&
            events
              .filter(
                (event) =>
                  dayjs(event.startDate).isSame(selectedDate, 'day')
              )
              .map((event: any) => (
                <Card
                  key={event.id}
                  className="card-container"
                  actions={[
                    <DeleteOutlined key="delete" onClick={() => handleDeleteEvent(event._id)} className="delete-icon-card" />,
                    <EditOutlined key="edit" onClick={() => handleEditEvent(event._id)} className="edit-icon-card" />,
                    <StopOutlined key="cancel" onClick={() => handleCancelEvent(event._id)} />,
                  ]}
                >
                  <Meta
                    avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
                    title={event.title}
                    description={event.description}
                  />
                  <Divider orientation="left">Start Date:</Divider>
                  <Title level={5}> {formatDate(event.startDate)}</Title>

                  <Divider orientation="left">End Date:</Divider>
                  <Title level={5}> {formatDate(event.endDate)}</Title>

                  <Divider orientation="left">Start Time:</Divider>
                  <Title level={5}> {formatTime(event.startTime)}</Title>

                  <Divider orientation="left">End Time:</Divider>
                  <Title level={5}> {formatTime(event.endTime)}</Title>

                  <Divider orientation="left">Location:</Divider>
                  <Title level={5}> {event.location}</Title>

                  <Divider orientation="left">Status:</Divider>
                  <Title level={5}>{event.status}</Title>
                </Card>
              ))}
        </Drawer>
      </Space>
      <Modal
        visible={isModalOpen}
        onCancel={handleCancel}
        onOk={editEventId ? handleSaveEdit : addNewEvent}
        title={editEventId ? "Edit Event" : "Add New Event"}
        footer={
          editEventId ? (
            <span className="modal-footer">
            <Button
              key="save"
              type="primary"
              icon={<CheckCircleOutlined />}
              onClick={handleSaveEdit}>Save Changes
              </Button>
              
            </span>
          ) : null
        }
      >
        <Title level={5}>Title*</Title>
        <Input
          placeholder="Title"
          name="title"
          value={newEvent.title}
          onChange={handleInputChange}
        />
        <div style={{ margin: "24px 0" }} />
        <Title level={5}>Description</Title>
        <TextArea
          placeholder="Description"
          autoSize={{ minRows: 3, maxRows: 5 }}
          name="description"
          value={newEvent.description}
          onChange={handleInputChange}
        />
        <Title level={5}>Start Date*</Title>
        <DatePicker
          onChange={handleDateChange("startDate")}
          className="modal-date-picker"
          value={newEvent.startDate}
        />
        <Title level={5}>End Date</Title>
        <DatePicker
          onChange={handleDateChange("endDate")}
          className="modal-date-picker-end"
          value={newEvent.endDate}
        />
        <Title level={5}>Start Time</Title>
        <TimePicker
          onChange={handleTimeChange("startTime")}
          value={newEvent.startTime}
        />
        <Title level={5}>End Time</Title>
        <TimePicker
          onChange={handleTimeChange("endTime")}
          value={newEvent.endTime}
        />
        <Title level={5}>Location</Title>
        <Input
          placeholder="Location"
          prefix={<EnvironmentOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
          name="location"
          value={newEvent.location}
          onChange={handleInputChange}
        />
      </Modal>
    </>
  );
};

export default PersonalCalendarPage;

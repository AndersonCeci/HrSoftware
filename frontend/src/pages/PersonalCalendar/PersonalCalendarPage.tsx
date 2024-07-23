import React, { useState } from "react";
import "../../styles/PersonalCalendarPage/PersonalCalendar.css";
import {
  Badge,
  Calendar,
  Drawer,
  Space,
  Modal,
  Typography,
  Card,
  Avatar,
  Divider,
  Button,
} from "antd";
import dayjs, { Dayjs } from "dayjs";
import {
  DeleteOutlined,
  EditOutlined,
  StopOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import TableHeader from "../../components/Table/TableHeader";
import Meta from "antd/es/card/Meta";
import EditNewEventForm from "./components/EditNewEventForm";
import useEvents, { Status, NewEvent } from './hooks/personalCalendarFetchHooks';

const { Title } = Typography;

const PersonalCalendarPage: React.FC = () => {
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
    invitee: [],
  });
  const [editEventId, setEditEventId] = useState<string | null>(null);

  const { allEvents, addNewEvent, handleDeleteEvent, handleCancelEvent, handleEditEvent } = useEvents();

  const showModal = () => {
    setIsModalOpen(true);
  };

  function onChanges(value: any, identifier: string) {
    setNewEvent((prev) => ({ ...prev, [identifier]: value }));
  }

  const formatDateAndTime = (isoDateString: string) => {
    const date = new Date(isoDateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return `${day}-${month}-${year} ${hours}:${minutes}`;
  };

  const showDrawer = (value: Dayjs) => {
    setSelectedDate(value);
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
    setSelectedDate(null);
  };

  const getListData = (value: Dayjs) => {
    const eventsForDate = allEvents.filter((event) => {
      const eventDate = dayjs(event.startDate);
      return (
        eventDate.date() === value.date() && eventDate.month() === value.month()
      );
    });

    const listData = eventsForDate.map((allEvents: any) => {
      let type: "error" | "success" | "warning" | "default" = "warning";
      if (allEvents.status === Status.Cancelled) type = "error";
      if (allEvents.status === Status.Finished) type = "success";
      if (allEvents.status === Status.Ongoing) type = "warning";
      if (allEvents.status === Status.Upcoming) type = "default";

      return {
        type: type,
        content: allEvents.title,
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

  const handleAddNewEvent = async () => {
    await addNewEvent(newEvent);
    setIsModalOpen(false);
    setNewEvent({
      title: "",
      description: "",
      startDate: null,
      endDate: null,
      startTime: null,
      endTime: null,
      location: "",
      invitee: [],
    });
  };

  const handleEditEventClick = async () => {
    if (editEventId) {
      await handleEditEvent(editEventId, newEvent);
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
        invitee: [],
      });
      setOpen(false);

    }
  };
  return (
    <>
      <Space>
        <section className="calendar-container">
          <TableHeader title="Personal Calendar" onClick={showModal} />
          <Calendar cellRender={cellRender} onSelect={showDrawer} />
        </section>
        <Drawer
          placement="bottom"
          closable={false}
          onClose={onClose}
          open={open}
          key="bottom"
          className="drawer-container"
        >
          <h2>Events on {selectedDate?.format("DD-MM-YYYY")}</h2>

          {allEvents.length > 0 && selectedDate && (
            <>
              <h3>Your Events</h3>
              {allEvents
                .filter((event) => dayjs(event.startDate).isSame(selectedDate, "day"))
                .map((event) => (
                  <Card
                  key={event._id}
                  className="card-container"
                  actions={[
                    <DeleteOutlined
                      key="delete"
                      onClick={() => handleDeleteEvent(event._id)}
                      className="delete-icon-card"
                    />,
                    <EditOutlined
                      key="edit"
                      onClick={() => {
                        setEditEventId(event._id);
                        setNewEvent({
                          title: event.title,
                          description: event.description,
                          startDate: dayjs(event.startDate),
                          endDate: dayjs(event.endDate),
                          startTime: dayjs(event.startTime),
                          endTime: dayjs(event.endTime),
                          location: event.location,
                        });
                        showModal();
                      }}
                      className="edit-icon-card"
                    />,
                    <StopOutlined
                      key="cancel"
                      onClick={() => handleCancelEvent(event._id)}
                    />,
                  ]}
                >
                    <Meta
                      avatar={
                        <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />
                      }
                      title={event.title}
                      description={event.description}
                    />
                    <Divider orientation="left">Start Date:</Divider>
                    <Title level={5}>{formatDateAndTime(event.startDate)}</Title>

                    <Divider orientation="left">End Date:</Divider>
                    <Title level={5}>{formatDateAndTime(event.endDate)}</Title>

                    <Divider orientation="left">Start Time:</Divider>
                    <Title level={5}>{formatDateAndTime(event.startTime)}</Title>

                    <Divider orientation="left">End Time:</Divider>
                    <Title level={5}>{formatDateAndTime(event.endTime)}</Title>

                    <Divider orientation="left">Location:</Divider>
                    <Title level={5}>{event.location}</Title>

                    <Divider orientation="left">Status:</Divider>
                    <Title level={5}>{event.status}</Title>
                  </Card>
                ))}
            </>
          )}
        </Drawer>
        <Modal
        open={isModalOpen}
        onCancel={() => {
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
        }}
        title={editEventId ? "Edit Event" : "Add New Event"}
        footer={[
          editEventId ? (
            <Button key="submit" type="primary" onClick={handleEditEventClick}>
              <CheckCircleOutlined key="save" className="save-icon" />
              Save Changes
            </Button>
          ) : (
            <Button key="submit" type="primary" onClick={handleAddNewEvent}>
              Add Event
            </Button>
          )
        ]}
      >
        <EditNewEventForm newEvent={newEvent} onChanges={onChanges} />
      </Modal>
      </Space>
    </>
  );
};

export default PersonalCalendarPage;

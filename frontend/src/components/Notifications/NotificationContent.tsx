import React, { useEffect, useState } from "react";
import { Avatar, List } from "antd";
import VirtualList from "rc-virtual-list";
import "../Notifications/NotificationStyle.css";

interface NotificationItem
{
  _id: string
  message: string;
  createdAt: string;
  isRead: boolean;
}

const url = "http://localhost:3000/notifications";

const ContainerHeight = 400;

const NotificationContent: React.FC = () => {
  const [data, setData] = useState<NotificationItem[]>([]);

  const appendData = () => {
    fetch(url)
      .then((res) => res.json())
      .then((body) => {
        console.log(body, "bodyyNotificationss");
        setData(body);
        // message.success(`${body.results.length} more items loaded!`);
      });
  };


          console.log(data, "messageeeee");


  useEffect(() => {
    appendData();
  }, []);

  const onScroll = (e: React.UIEvent<HTMLElement, UIEvent>) => {
    // Refer to: https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight#problems_and_solutions
    if (
      Math.abs(
        e.currentTarget.scrollHeight -
          e.currentTarget.scrollTop -
          ContainerHeight
      ) <= 1
    ) {
      appendData();
    }
  };

  return (
    <List className="ant-list">
      <VirtualList
        data={data}
        height={ContainerHeight}
        itemHeight={47}
        itemKey="email"
        onScroll={onScroll}
      >
        { ( item: NotificationItem ) => (
          <List.Item key={item._id}>
            <List.Item.Meta
              avatar={<Avatar />}
              title={<a href="https://ant.design">{item.message}</a>}
              description={item.createdAt}
            />
            <div className="markAsRead">Mark as Read</div>
          </List.Item>
        )}
      </VirtualList>
    </List>
  );
};

export default NotificationContent;

import React, { createContext, useContext, useState, ReactNode } from "react";

interface NotificationItem {
  _id: string;
  message: string;
  createdAt: string;
  isRead: boolean;
  userId: string;
}

interface NotificationContextProps {
  data: NotificationItem[];
  setData: React.Dispatch<React.SetStateAction<NotificationItem[]>>;
  dataLength: number;
}

const NotificationContext = createContext<NotificationContextProps | undefined>(
  undefined
);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [data, setData] = useState<NotificationItem[]>([]);

  const dataLength = data.length;

  return (
    <NotificationContext.Provider value={{ data, setData, dataLength }}>
      {children}
    </NotificationContext.Provider>
  );
};

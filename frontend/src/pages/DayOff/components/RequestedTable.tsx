import { useEffect, useState } from "react";
import { TableProps } from "antd";
import Modal from "../../../components/Shared/Modal";
import Table from "../../../components/Table/Table";
import { RequestedDataType } from "../types/RequestedLeave";
import TableHeader from "../../../components/Table/TableHeader";
import Drawer from "../../../components/Shared/Drawer";
import RequestForm from "../../DayOff/components/RequestForm";
import { createColumns } from "../utils/tableColumns";
import useHttp from "../../../hooks/useHttp";
import { useTranslation } from "react-i18next";

export interface RequestedTableProps {
  data?: RequestedDataType[];
  onAdd?: (newRequest: RequestedDataType) => void;
}

const API = import.meta.env.REACT_APP_DAYOFF_API;

const RequestedTable = () => {
  const { t } = useTranslation();
  const [data, setData] = useState<RequestedDataType[]>([]);
  const [isDrawerOpen, setisDrawerOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [, , fetchData] = useHttp();
  const [selectedRecord, setSelectedRecord] = useState<
    RequestedDataType | undefined
  >(undefined);

  const getEmployeeIdFromLocalStorage = () => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      try {
        const parsedData = JSON.parse(userData);
        return {
          employID: parsedData.employID,
          role: parsedData.role,
        };
      } catch (e) {
        console.error("Failed to parse user data from local storage:", e);
        return null;
      }
    }
    return null;
  };

  function handleDrawerClose() {
    setisDrawerOpen(false);
  }

  function handleApprove(id: string) {
    fetchData(
      {
        url: `${API}/${id}/approve`,
        method: "PATCH",
      },
      () => {
        setData((prev) =>
          prev.map((item) => {
            if (item._id === id) {
              return { ...item, isApproved: true };
            }
            return item;
          })
        );
      }
    );
  }

  useEffect(() => {
    const user = getEmployeeIdFromLocalStorage();
    const employeeId = user?.employID;
    const role = user?.role;
    function fetchDataBasedOnRole(employeeId?: string, role?: string) {
      if (role === "employee" && employeeId) {
        const url = `${API}/${employeeId}`;
        fetchData({ url }, (response) => {
          setData(response);
        });
      } else if (role === "hr") {
        const url = `${API}`;
        fetchData({ url }, (response) => {
          setData(response);
        });
      }
    }

    if (role) {
      fetchDataBasedOnRole(employeeId, role);
    }
  }, [fetchData]);

  function handleDecline(id?: string) {
    fetchData(
      {
        url: `${API}/${id}/soft-delete`,
        method: "DELETE",
      },
      () => {
        setData((prev) => prev.filter((item) => item._id !== id));
      }
    );
  }

  const onDecline = (record: RequestedDataType) => {
    setIsModalOpen(true);
    setSelectedRecord(record);
    // setData((prevData) => prevData.filter((item) => item.id !== record.id))
  };

  function handleAddNew(data: RequestedDataType) {
    setData((prev) => [...prev, data]);
  }

  function handleAddNewRequest(newRequest: RequestedDataType) {
    fetchData(
      {
        url: API,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: newRequest,
      },
      (response) => {
        handleAddNew(response);
        setisDrawerOpen(false);
      }
    );
  }

  const columns: TableProps<RequestedDataType>["columns"] = createColumns(
    data,
    handleApprove,
    onDecline
  );

  return (
    <>
      <Drawer
        placement="right"
        title={t("leaveRequestForm")}
        isOpen={isDrawerOpen}
        onClose={handleDrawerClose}
      >
        <RequestForm onAdd={handleAddNewRequest} />
      </Drawer>
      <Modal
        isOpen={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={() => {
          handleDecline(selectedRecord?._id);
          setIsModalOpen(false);
        }}
        title={t("deleteRequest")}
      >
        <p>
          {t("Areyousureyouwanttodeclinethisrequest")}? {t("madeby")}{" "}
          {selectedRecord?.EmployeeName}
        </p>
      </Modal>
      <TableHeader
        title={t("requestedLeave")}
        onClick={() => setisDrawerOpen(true)}
      />
      <Table columns={columns} data={data} />
    </>
  );
};

export default RequestedTable;

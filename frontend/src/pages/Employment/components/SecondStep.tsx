import { Col, Form, Row, Flex, Upload, Input, Select } from "antd";

import { EuroCircleOutlined } from "@ant-design/icons";
import FormInputs from "../../../components/Shared/InputTypes/FormInputs";
import { getDevRoles } from "../utils/helperFunctions";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

const TEAM_LEADERS = import.meta.env.REACT_APP_TEAM_LEADERS_SEARCH_API;

//!THIS MIGHT NEED ATTENTION

const SecondStep = ({ form }: any) => {
  // const form = Form.useFormInstance();
  const { t } = useTranslation();
  const [file, setFile] = useState<File | undefined>(undefined);
  const [selectTeamLeader, setSelectTeamLeader] = useState<any[]>([]);
  const position = getDevRoles().map((role) => ({ label: role, value: role }));
  position.push({ label: "Project Manager", value: "projectManager" });

  useEffect(() => {
    const fetchTeamLeaders = async () => {
      try {
        const response = await fetch(TEAM_LEADERS);
        if (!response.ok) {
          throw new Error(
            `Failed to fetch team leaders: ${response.statusText}`,
          );
        }

        const data = await response.json();
        const teamLeaderOptions = data.map((leader: any) => ({
          label: `${leader.name} ${leader.surname}`,
          value: leader._id,
        }));
        setSelectTeamLeader(teamLeaderOptions);
      } catch (error) {
        console.error("Error fetching team leaders:", error);
      }
    };

    fetchTeamLeaders();
  }, []);

  const handleUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      const uploadResponse = await fetch("http://localhost:3000/files/upload", {
        method: "POST",
        body: formData,
      });
      const uploadData = await uploadResponse.json();
      const fileUrl = uploadData.fileUrl;

      form.setFieldsValue({ contract: fileUrl });
    } catch (error) {
      console.error("File upload error:", error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleUpload(file);
    }
  };

  const handleTeamLeaderChange = (selectedTeamLeaders: any[]) => {
    form.setFieldsValue({ teamLeaders: selectedTeamLeaders });
  };



  return (
    <Flex vertical>
      <Row gutter={16}>
        <Col xs={{ offset: 1, span: 23 }} md={{ offset: 1, span: 10 }}>
          <FormInputs.Select
            label={t("position")}
            name="position"
            options={position}
            required
          />
        </Col>
        <Col xs={{ offset: 1, span: 23 }} md={{ offset: 1, span: 10 }}>
          <FormInputs.Input
            label={t("salary")}
            name="salary"
            required
            defaultValidateRule="number"
            prefix={<EuroCircleOutlined />}
          />
        </Col>
      </Row>
      <Row gutter={16}>
        <Col xs={{ offset: 1, span: 23 }} md={{ offset: 1, span: 10 }}>
          <Form.Item label={t("teamLeader")} name="teamLeaders">
            <Select
              mode="multiple"
              options={selectTeamLeader}
              placeholder={t("Select Team Leaders")}
              onChange={handleTeamLeaderChange}
            />
          </Form.Item>
        </Col>
        <Col
          xs={{ offset: 1, span: 23 }}
          md={{ offset: 1, span: 10 }}
          lg={{ offset: 1, span: 5 }}
        >
          <FormInputs.DatePicker
            label={t("startingOn")}
            name="startingDate"
            required
            isDisabledDate
          />
        </Col>
        <Col
          xs={{ offset: 1, span: 23 }}
          md={{ offset: 1, span: 21 }}
          lg={{ offset: 0, span: 5 }}
        >
          <Form.Item
            label={t("contract")}
            name="contract"
            valuePropName="contract"
            style={{ width: "100%" }}
          >
            <Input type="file" size="large" onChange={handleFileChange} />
          </Form.Item>
        </Col>
      </Row>
    </Flex>
  );
};

export default SecondStep;

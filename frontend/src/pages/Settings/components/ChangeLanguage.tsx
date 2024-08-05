import { MoonOutlined, SunOutlined } from "@ant-design/icons";
import { Button, Card, ConfigProvider, Switch, theme } from "antd";
import { t } from "i18next";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  IoNotificationsOffOutline,
  IoNotificationsOutline,
} from "react-icons/io5";

export default function ChangeLanguage() {
  const { defaultAlgorithm, darkAlgorithm } = theme;
  const { i18n } = useTranslation();
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleClick = () => {
    setIsDarkMode((previousValue) => !previousValue);
  };

  const languagge = [
    { code: "sq", title: "Albanian" },
    { code: "en", title: "English" },
  ];

  const changeLanguage = (code: string) => {
    i18n.changeLanguage(code);
  };

  const onChange = (checked: boolean) => {
    console.log(`switch to ${checked}`);
  };

  return (
    <div style={{ display: "flex", margin: 20, alignItems: "center" }}>
      <Card
        title={"General"}
        style={{ width: "750px" }}
        styles={{ body: { display: "flex", flexDirection: "column" } }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ fontSize: 15, fontWeight: "bold", width: "200px" }}>
            {t("changeWebsiteLanguage")}
          </div>
          <div style={{ alignItems: "center" }}>
            {languagge.map((lang) => (
              <Button
                style={{ float: "right", marginLeft: "10px" }}
                onClick={() => changeLanguage(lang.code)}
              >
                {lang.title}
              </Button>
            ))}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "10px",
          }}
        >
          <div style={{ fontSize: 15, fontWeight: "bold" }}>Theme:</div>
          <ConfigProvider
            theme={{
              algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
            }}
          >
            <Button onClick={handleClick}> Change Theme to {isDarkMode? "Light" : "Dark"}</Button>
          </ConfigProvider>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "10px",
          }}
        >
          <div style={{ fontSize: 15, fontWeight: "bold" }}>
            Enable Notifications:
          </div>
          <Switch
            style={{ float: "right" }}
            defaultChecked
            onChange={onChange}
            checkedChildren={<IoNotificationsOutline />}
            unCheckedChildren={<IoNotificationsOffOutline />}
          />
        </div>
      </Card>
    </div>
  );
}

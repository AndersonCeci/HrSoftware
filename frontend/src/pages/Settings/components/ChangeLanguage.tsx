import { Button } from "antd";
import { t } from "i18next";
import React, { useTransition } from "react";
import { useTranslation } from "react-i18next";

export default function ChangeLanguage ()
{
  const { i18n } = useTranslation();


  const languagge = [
    { code: "sq", title: "Ablanian" },
    { code: "en", title: "English" },
  ];

  const changeLanguage=(code: string) =>
  {
    i18n.changeLanguage(code)
  }

  return (
    <div style={{ display: "flex", margin: 20, alignItems: "center" }}>
      <div style={ { fontSize: 15, fontWeight: "bold" } }>
        {t('changeWebsiteLanguage')}
      </div>

      {languagge.map((lang) => (
        <div style={{ marginLeft: 10 }}>
          <Button onClick={() => changeLanguage(lang.code)}>
            {lang.title}
          </Button>
        </div>
      ))}
    </div>
  );
}

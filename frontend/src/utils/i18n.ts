import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      attendanceOverview: "Attendance Overview",
      activestatus: "Active Employee",
      recruitmentTitle: "Recruitment",
      salariesTitle: "Salaries",
      eventTitle: "Events",
      taskList: "Task List",
      remoteEmployee: "Remote Employee",
      dismissedEmployee: "Dissmised Employee",
      logOut: "Log Out",
      employees: "Employment",
      assetsTitle: "Assets",
      timeOff: "Lejet",
      requestedLeave: "kërkesa-për-leje",
      calendarLeave: "personal-calendar",
      company: "kompania",
      events: "eventet",
      assets: "asetet",
      changeWebsiteLanguage: "Change Website Language",
      organisationalStructure: "struktura-organizative",
      dashboard: "dashboar",
    },
  },
  sq: {
    translation: {
      attendanceOverview: "Ditet e mbetura",
      activestatus: "Punonjesit Aktiv",
      recruitmentTitle: "Rekrutimet",
      salariesTitle: "Pagat",
      eventTitle: "Evente",
      taskList: "Lista e Tasqeve",
      remoteEmployee: "Punonjesit Remote",
      dismissedEmployee: "Punonjesit e Larguar",
      logOut: "Dil",
      employees: "Punonjesit",
      assetsTitle: "Asetet",
      timeOff: "Lejet",
      requestedLeave: "Kërkesa-Për-Leje",
      calendarLeave: "kalendari-leje",
      company: "kompania",
      events: "eventet",
      assets: "asetet",
      changeWebsiteLanguage: "Ndrysho gjuhën në faqe",
      organisationalStructure: "struktura-organizative",
      dashboard: 'temp'
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "sq",

  keySeparator: false,

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;

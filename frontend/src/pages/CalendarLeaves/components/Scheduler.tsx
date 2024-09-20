import { registerLicense } from "@syncfusion/ej2-base";
import "../styles/Scheduler.css";
import {
  ScheduleComponent,
  Month,
  Week,
  Agenda,
  TimelineMonth,
  TimelineYear,
  ViewsDirective,
  ViewDirective,
  Inject,
  Resize,
  DragAndDrop,
  EventRenderedArgs,
} from "@syncfusion/ej2-react-schedule";
import { useRef } from "react";
import { SchedulerProps } from "../types/ScheduleProps";
import { fieldsData, onDragStart, applyCategoryColor } from "../utils/util";

registerLicense(
  "Ngo9BigBOggjHTQxAR8/V1NDaF5cWWtCd0x0Qnxbf1x0ZFBMYFpbRHRPMyBoS35RckVqW39edXRTRmJeU0Ry"
);

const Scheduler = ({
  dataSource,
  currentView = "Month",
  allowDragAndDrop = false,
  allowResizing = false,
}: SchedulerProps) => {
  const scheduleObj = useRef<any>(null);

  const onEventRendered = (args: EventRenderedArgs): void => {
    applyCategoryColor(args, scheduleObj.current.currentView);
  };

  const eventSettings = {
    dataSource: dataSource,
    fields: fieldsData,
  };

  return (
    <>
      <ScheduleComponent
        height={"90vh"}
        eventSettings={eventSettings}
        currentView={currentView}
        selectedDate={new Date()}
        allowDragAndDrop={allowDragAndDrop}
        allowResizing={allowResizing}
        dragStart={onDragStart}
        ref={scheduleObj}
        readonly={true}
        eventRendered={onEventRendered}
      >
        <ViewsDirective>
          <ViewDirective option="Month" />
          <ViewDirective option="TimelineMonth" />
        </ViewsDirective>

        <Inject
          services={[
            Week,
            Agenda,
            Month,
            TimelineMonth,
            TimelineYear,
            Resize,
            DragAndDrop,
          ]}
        />
      </ScheduleComponent>
    </>
  );
};

export default Scheduler;

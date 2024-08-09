import { type Event } from "@/assets/code/calendar/calendar-interfaces";

const selectedEventData = {
  title: ref(""),
  type: ref(""),
  isHappening: ref(false),
  data: ref({} as Event),
};

export const useEventInfoDisplayer = () => selectedEventData;

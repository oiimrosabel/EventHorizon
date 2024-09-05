import { type Event } from "@/assets/code/calendar/calendar-interfaces";

const selectedEventData = {
  _title: ref(""),
  get title() {
    return this._title.value;
  },
  set title(value: string) {
    this._title.value = value;
  },

  _type: ref(""),
  get type() {
    return this._type.value;
  },
  set type(value: string) {
    this._type.value = value;
  },

  _happening: ref(false),
  get isHappening() {
    return this._happening.value;
  },
  set isHappening(value: boolean) {
    this._happening.value = value;
  },

  _data: ref({} as Event),
  get data() {
    return this._data.value;
  },
  set data(value: Event) {
    this._data.value = value;
  },
};

export const useEventCard = () => selectedEventData;

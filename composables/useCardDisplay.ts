const commonCardState = {
  _theme: ref(false),
  get theme() {
    return this._theme.value;
  },
  set theme(value: boolean) {
    this._theme.value = value;
  },

  _lookup: ref(false),
  get lookup() {
    return this._lookup.value;
  },
  set lookup(value: boolean) {
    this._lookup.value = value;
  },

  _share: ref(false),
  get share() {
    return this._share.value;
  },
  set share(value: boolean) {
    this._share.value = value;
  },

  _event: ref(false),
  get event() {
    return this._event.value;
  },
  set event(value: boolean) {
    this._event.value = value;
  },
};

export const useCardDisplay = () => commonCardState;

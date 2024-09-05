const bookmarker = {
  _bookmarked: ref(false),

  set bookmark(value: boolean) {
    this._bookmarked.value = value;
  },

  get bookmark() {
    return this._bookmarked.value;
  },
};

export const useBookmarker = () => bookmarker;

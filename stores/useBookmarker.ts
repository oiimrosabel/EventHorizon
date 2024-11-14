import { bookmarkService } from "~/services/bookmark/bookmark.service";
import { formatService } from "~/services/format/format.service";

const PLACEHOLDER = "Sans titre";

export const useBookmarker = defineStore("bookmarker", () => {
  const isBookmarkedRef = ref<boolean>(false);

  const bookmarkNameRef = ref<string>(PLACEHOLDER);

  const isBookmarked = computed(() => isBookmarkedRef.value);

  const bookmarkName = computed(() => bookmarkNameRef.value);

  const updateData = (calId?: string) => {
    if (!calId) return;
    const bookmarked = bookmarkService.isBookmarked(calId);
    isBookmarkedRef.value = bookmarked;
    if (bookmarked)
      bookmarkNameRef.value = bookmarkService.getBookmarkName(calId);
    else bookmarkNameRef.value = PLACEHOLDER;
  };

  const setBookmark = (set: boolean, name = PLACEHOLDER) => {
    isBookmarkedRef.value = set;
    bookmarkNameRef.value = name;
    useHeadSafe({
      title: formatService.formatTitle(name),
    });
  };

  return { isBookmarked, bookmarkName, updateData, setBookmark };
});

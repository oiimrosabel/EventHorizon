import { cookiesService } from "@/assets/code/cookies/cookies.service";
import { calendarService } from "@/assets/code/calendar/calendar.service";

const MARK_COOKIE_NAME = "ade-bookmarks";

class BookmarkService {
  getBookmarks() {
    const bookmarksString = cookiesService.getCookieOrFallback(
      MARK_COOKIE_NAME,
      "",
    ) as string;
    if (bookmarksString === "") return [];
    const bookmarksList = bookmarksString.split("+");
    return this.cleanBookmarks(bookmarksList);
  }

  isBooked(id: string) {
    if (!calendarService.isValidId(id)) return;
    const bookmarksList = this.getBookmarks();
    return bookmarksList.includes(id);
  }

  toggleBookmark(id: string) {
    if (!calendarService.isValidId(id)) return;
    const bookmarksList = this.getBookmarks();
    const index = bookmarksList.indexOf(id);
    if (index > -1) bookmarksList.splice(index, 1);
    else bookmarksList.push(id);
    cookiesService.setCookie(
      MARK_COOKIE_NAME,
      this.cleanBookmarks(bookmarksList).join("+"),
      32,
    );
  }

  deleteAllBookmarks() {
    cookiesService.deleteCookie(MARK_COOKIE_NAME);
  }

  private cleanBookmarks(bookmarksList: Array<string>) {
    bookmarksList.filter((value) => value);
    return bookmarksList;
  }
}

export const bookmarkService = new BookmarkService();

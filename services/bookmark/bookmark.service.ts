import { type Bookmark } from "~/services/bookmark/bookmark.common";

const BOOKMARKS_ID_NAME = "ade-bookmarks";
const BOOKMARK_ERROR = "Unable to add bookmark.";

class BookmarkService {
  private readonly nameToCalMap: Map<string, string>;
  private readonly calToNameMap: Map<string, string>;

  constructor() {
    this.nameToCalMap = new Map<string, string>();
    this.calToNameMap = new Map<string, string>();
  }

  fetchBookmarksFromCookies() {
    const rawBookmarksString = localStorage.getItem(BOOKMARKS_ID_NAME);
    if (!rawBookmarksString) {
      this.nameToCalMap.clear();
      return;
    }
    const rawBookmarksArray = rawBookmarksString
      .split("+")
      .filter((value) => value !== "");
    for (const rawBookmark of rawBookmarksArray) {
      const bookmarkData = rawBookmark.split("@");
      if (bookmarkData[0] && bookmarkData[1]) {
        this.nameToCalMap.set(bookmarkData[0], bookmarkData[1]);
        this.calToNameMap.set(bookmarkData[1], bookmarkData[0]);
      }
    }
  }

  getAllBookmarks() {
    const res: Bookmark[] = [];
    this.nameToCalMap.forEach((value, key) =>
      res.push({
        name: key,
        cal: value,
      }),
    );
    return res;
  }

  resetBookmarks() {
    this.nameToCalMap.clear();
    this.calToNameMap.clear();
    localStorage.setItem(BOOKMARKS_ID_NAME, "");
  }

  isBookmarked(cal: string) {
    return this.calToNameMap.has(cal);
  }

  getBookmarkName(cal: string, fallback = "") {
    return this.calToNameMap.get(cal) ?? fallback;
  }

  doesNameExists(name: string) {
    return this.nameToCalMap.has(name);
  }

  isValidBookmarkName(tag: string) {
    return /^[A-Za-z0-9 ]+$/.test(tag);
  }

  addBookmark(name: string, cal: string) {
    if (!this.isValidBookmarkName(name) || this.nameToCalMap.has(name))
      throw new Error(BOOKMARK_ERROR);
    this.nameToCalMap.set(name, cal);
    this.calToNameMap.set(cal, name);
    this.saveBookmarks();
  }

  deleteBookmark(name: string) {
    const id = this.nameToCalMap.get(name);
    if (!id) return;
    this.calToNameMap.delete(id);
    this.nameToCalMap.delete(name);
    this.saveBookmarks();
  }

  private saveBookmarks() {
    const bookmarksList: string[] = [];
    for (const element of this.nameToCalMap.entries())
      bookmarksList.push(`${element[0]}@${element[1]}`);
    localStorage.setItem(BOOKMARKS_ID_NAME, bookmarksList.join("+"));
  }
}

export const bookmarkService = new BookmarkService();

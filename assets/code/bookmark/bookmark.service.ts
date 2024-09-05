import { cookiesService } from "@/assets/code/cookies/cookies.service";

const BOOKMARKS_COOKIE_NAME = "ade-bookmarks";

interface Bookmark {
  name: string;
  cal: string;
}

class BookmarkService {
  private readonly nameToCalMap: Map<string, string>;
  private readonly calToNameMap: Map<string, string>;

  constructor() {
    this.nameToCalMap = new Map<string, string>();
    this.calToNameMap = new Map<string, string>();
  }

  fetchBookmarksFromCookies() {
    const rawBookmarksString = cookiesService.getCookieOrFallback(
      BOOKMARKS_COOKIE_NAME,
      "",
    ) as string;
    if (rawBookmarksString === "") {
      this.nameToCalMap.clear();
      return;
    }
    const rawBookmarksArray = rawBookmarksString
      .split("+")
      .filter((value) => value !== "");
    for (const rawBookmark of rawBookmarksArray) {
      const bookmarkData = rawBookmark.split("@");
      if (bookmarkData.length === 2) {
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
    cookiesService.setCookie(BOOKMARKS_COOKIE_NAME, "");
  }

  isEmpty() {
    return this.nameToCalMap.size === 0;
  }

  isBookmarked(cal: string) {
    return this.calToNameMap.has(cal);
  }

  isNameExists(name: string) {
    return this.nameToCalMap.has(name);
  }

  isValidBookmarkName(tag: string) {
    return /^[A-Za-z0-9 ]+$/.test(tag);
  }

  addBookmark(name: string, cal: string) {
    if (!this.isValidBookmarkName(name) || this.nameToCalMap.has(name))
      throw new Error("Unable to add bookmark.");
    this.nameToCalMap.set(name, cal);
    this.calToNameMap.set(cal, name);
    this.saveBookmarks();
  }

  deleteBookmark(tag: string) {
    let map: Map;
    let mapRev: Map;
    switch (true) {
      case this.nameToCalMap.has(tag):
        map = this.nameToCalMap;
        mapRev = this.calToNameMap;
        break;
      case this.calToNameMap.has(tag):
        map = this.calToNameMap;
        mapRev = this.nameToCalMap;
        break;
      default:
        throw new Error("Unable to delete bookmark.");
    }
    const tagRev = map.get(tag)!;
    map.delete(tag);
    mapRev.delete(tagRev);
    this.saveBookmarks();
  }

  private saveBookmarks() {
    let bookmarksList: string[] = [];
    for (const element of this.nameToCalMap.entries())
      bookmarksList.push(`${element[0]}@${element[1]}`);
    cookiesService.setCookie(BOOKMARKS_COOKIE_NAME, bookmarksList.join("+"));
  }
}

export const bookmarkService = new BookmarkService();

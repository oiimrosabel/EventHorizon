class LinksService {
  changeLocation(url: string, newTab = false) {
    const a = document.createElement("a");
    a.href = url;
    if (newTab) {
      a.target = "_blank";
      a.rel = "noopener noreferrer";
    }
    a.click();
  }

  getFullUrl() {
    return window.location.href;
  }

  async shareData(url: string, title?: string) {
    try {
      await navigator.share({
        title: title ?? url,
        url: url,
      });
      return true;
    } catch (_) {
      return false;
    }
  }

  async copyDataToClipboard(data: string) {
    try {
      await navigator.clipboard.writeText(data);
    } catch (_) {
      return false;
    }
    return true;
  }

  reloadPage() {
    location.reload();
  }

  getDataFromUrl(url: string, key: string) {
    const reg = /[?&]([^=]+)=([^&]+)/gm;
    let res;
    do {
      res = reg.exec(url);
      if (res && res[1] === key) return res[2];
    } while (res);
    return undefined;
  }
}

export const linksService = new LinksService();

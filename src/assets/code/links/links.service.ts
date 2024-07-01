class LinksService {
  changeLocation(url: string, newTab = false) {
    const a = document.createElement('a')
    a.href = url
    if (newTab) {
      a.target = '_blank'
      a.rel = 'noopener noreferrer'
    }
    a.click()
  }

  getFullUrl() {
    return window.location.href
  }

  shareData(url: string, title?: string, failure?: string) {
    title = title ??= 'EventHorizon'
    failure = failure ??= 'Votre navigateur ne supporte pas le partage.'

    const data: ShareData = {
      title: title,
      url: url
    }
    try {
      navigator.share(data).then()
    } catch (err: any) {
      alert(failure)
    }
  }

  copyDataToClipboard(data: string, success?: string) {
    success = success ??= 'Copié avec succès.'
    navigator.clipboard.writeText(data).then(() => alert(success))
  }

  reloadPage() {
    location.reload()
  }

  getDataFromUrl(url: string, key: string) {
    const reg = /[?&]([^=]+)=([^&]+)/gm
    let res
    do {
      res = reg.exec(url)
      if (res && res[1] === key) return res[2]
    } while (res)
    return undefined
  }

  getOrigin(trimmed = false) {
    let res = window.location.origin
    if (trimmed) {
      let strippedUrl: Array<any> | null = /^https?:\/\/(.*):\d+(.*)$/gim.exec(res)
      if (!strippedUrl) strippedUrl = []
      else strippedUrl.shift()
      res = strippedUrl.join('')
    }
    return res
  }
}

export const linksService = new LinksService()

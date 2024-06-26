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
}

export const linksService = new LinksService()

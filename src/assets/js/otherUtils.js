export function changeLoc(href, redirect = true) {
    let a = document.createElement("a");
    a.href = href;
    if (redirect) {
        a.target = "_blank";
        a.rel = "noopener noreferrer";
    }
    a.click();
}

export function copyText(text) {
    navigator.clipboard.writeText(text).then(() => alert(`Texte "${text}" copié avec succès.`));
}

export function reload() {
    location.reload();
}

export function getCurrentURL() {
    return window.location.href;
}

export function shareText(text) {
    try {
        navigator.share(text);
    } catch (e) {
        copyText(text);
    }
}
export function changeLoc(href, redirect = true) {
    let a = document.createElement("a");
    a.href = href;
    if (redirect) {
        a.target = "_blank";
        a.rel = "noopener noreferrer";
    }
    a.click();
}
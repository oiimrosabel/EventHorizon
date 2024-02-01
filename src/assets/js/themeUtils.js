export function switchTheme(theme) {
    if (theme === "system") {
        const isOsDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        switchTheme(isOsDark ? "stars" : "sage");
        document.cookie = `theme=system`;
        return;
    }
    if (theme === "time") {
        timeTheme();
        document.cookie = `theme=time`;
        return;
    }
    document.querySelector('html').dataset.theme = theme;
    document.cookie = `theme=${theme}`;
}

export function setTheme() {
    let cookie = getCookie("theme");
    if (cookie === "") {
        switchTheme("time");
    } else {
        switchTheme(cookie);
    }
}

export function getTheme() {
    return getCookie("theme") === "" ? null : getCookie("theme");
}


function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function timeTheme() {
    let time = new Date().getHours();
    if (time > 8 && time <= 17) {
        switchTheme(`sage`);
    } else {
        switchTheme(`stars`);
    }
}
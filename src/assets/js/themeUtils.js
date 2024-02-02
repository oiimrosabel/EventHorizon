import {getCookie, setCookie} from "@/assets/js/cookieUtils.js";

export function switchTheme(theme) {
    if (theme === "system") {
        const isOsDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        switchTheme(isOsDark ? "stars" : "sage");
        setCookie('theme', 'system');
        return;
    }
    if (theme === "time") {
        timeTheme();
        setCookie('theme', 'time');
        return;
    }
    document.querySelector('html').dataset.theme = theme;
    setCookie('theme', theme);
}

export function setTheme() {
    let cookie = getCookie("theme");
    if (cookie === "") {
        switchTheme("time");
    } else {
        switchTheme(cookie);
    }
}

function timeTheme() {
    let time = new Date().getHours();
    if (time > 8 && time <= 17) {
        switchTheme(`sage`);
    } else {
        switchTheme(`stars`);
    }
}
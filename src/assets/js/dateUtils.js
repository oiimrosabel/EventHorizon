export const dayAssociation = {
    0: "dim.",
    1: "lun.",
    2: "mar.",
    3: "mer.",
    4: "jeu.",
    5: "ven.",
    6: "sam."
}

export const monthAssociation = {
    0: "janv.",
    1: "fevr.",
    2: "mars",
    3: "avr.",
    4: "mai",
    5: "juin",
    6: "juil.",
    7: "août",
    8: "sep.",
    9: "oct.",
    10: "nov.",
    11: "dec."
}

export function diffTime(a, b) {
    let time1 = a.replace("_",":");
    let time2 = b.replace("_",":");
    let date1 = new Date(`2000-01-01T${time1}Z`);
    let date2 = new Date(`2000-01-01T${time2}Z`);
    if (date2 < date1) {
        date2.setDate(date2.getDate() + 1);
    }
    let diff = date2 - date1;
    let mm = Math.floor(diff / 1000 / 60) % 60;
    let hh = Math.floor(diff / 1000 / 60 / 60);
    return `${hh}h${mm === 0 ? "" : mm < 10 ? "0" + mm : mm}`
}

export function spanner(text) {
    let res = text.match("^((?:CM|TD|TP|CC)[0-9]{0,1})(.*)$");
    if(res == null){
        return text;
    }
    return `<span class="small">${res[1]}</span>${res[2]}`;
}

export function removeParenthesis(text) {
    return text.replace(/\([^()]*\) */g, "");
}

export function isNow(dtstart, dtend) {
    let date = new Date();
    let hour = `${date.getHours() < 10 ? "0" + date.getHours() : date.getHours()}_${date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()}`
    return dtstart <= hour && hour <= dtend;
}

export function displayDate(day, date){
    return `${dayAssociation[day]} ${date.substring(8)} ${monthAssociation[date.substring(5, 7) - 1]}`
}
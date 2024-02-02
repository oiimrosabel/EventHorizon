import calendars from "@/assets/json/calendars.json";

export class Calendar {
    identifier = "";
    url = "";
    title = "";
    result = null;

    constructor(identifier, isCustom = false) {
        if (isCustom) {
            this.title = "Lien personnalisé";
            this.url = identifier;
            this.identifier = "custom";
        } else {
            let link = calendars[identifier];
            if (link === undefined) {
                return new CalError(
                    -1,
                    "UnknownIdentifierError",
                    `Unknown \"${identifier}\" identifier.`);
            }
            this.title = link.title;
            this.url = link.url;
            this.identifier = identifier;
        }
        return this;
    }

    async fetch() {
        const flink = "https://horizon.imalonelynerd.fr/api/v2/?url=" + encodeURIComponent(this.url);
        const response = await fetch(flink);
        if (response === undefined || !response.ok || response.status !== 200) {
            return new CalError(
                -2,
                "BadFetchError",
                `Fetching \"${flink}\" failed.`
            )
        }
        let jsonobj = await response.json();
        if (jsonobj === undefined) {
            return new CalError(
                -3,
                "BadJsonError",
                `Converting \"${flink}\" as a JSON failed.`
            )
        }
        if (jsonobj.response !== 0) {
            return new CalError(
                jsonobj.response,
                "ResponseError",
                jsonobj.comment
            )
        }
        this.result = jsonobj.value;
        return true;
    }

    getAll() {
        return this.result;
    }

    getDay() {
        if (this.result === null || this.result.length === 0) {
            return null;
        }
        let res = this.result[0];
        let date = new Date();
        let day = `${date.getFullYear()}_${date.getMonth() < 9 ? "0" + (date.getMonth() - (-1)) : date.getMonth() - (-1)}_${date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}`;
        console.log(day);
        if (res[0]["DTSTART"]["date"] !== day) {
            return null;
        }
        return res;
    }

    getCurrentEvent() {
        let day = this.getDay();
        if (day === null) {
            return null;
        }
        let date = new Date();
        let hour = `${date.getHours() < 10 ? "0" + date.getHours() : date.getHours()}_${date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()}`;
        for (let k in day) {
            if (day[k]["DTSTART"]["hour"] <= hour && day[k]["DTEND"]["hour"] >= hour) { // ?
                return day[k];
            }
        }
        return null;
    }

    getNextEvent() {
        if (this.getCurrentEvent() != null) {
            return null;
        }
        if (this.result.length <= 1) {
            return null;
        }
        let day = this.getDay();
        if (day === null) {
            return null;
        }
        let date = new Date();
        let hour = `${date.getHours() < 10 ? "0" + date.getHours() : date.getHours()}_${date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()}`;
        for (let k in day) {
            if (day[k]["DTSTART"]["hour"] >= hour) { // ?
                return day[k];
            }
        }
        return this.result[1][0];
    }
}

export class CalError {
    code = 0;
    name = "";
    message = "";

    constructor(code, name, message) {
        this.code = code;
        this.name = name;
        this.message = message;
    }

    fetch() {
        return this;
    }
}
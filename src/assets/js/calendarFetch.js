import {useRoute, useRouter} from "vue-router";
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
                throw {name: "UnknownIdentifierError", message: `Unknown \"${identifier}\" identifier.`};
            }
            this.title = link.title;
            this.url = link.url;
            this.identifier = identifier;
        }
    }

    async fetch() {
        const flink = "https://horizon.imalonelynerd.fr/api/?url=" + encodeURIComponent(this.url);
        const response = await fetch(flink);
        if (response === undefined || !response.ok || response.status !== 200) {
            throw {name: "BadFetchError", message: `Fetching \"${flink}\" failed.`};
        }
        let jsonobj = await response.json();
        if (jsonobj === undefined) {
            throw {name: "BadJsonError", message: `Converting \"${flink}\" as a JSON failed.`};
        }
        if (jsonobj.response !== 0) {
            throw {name: "ResponseError", message: `Error ${jsonobj.response}: ${jsonobj.comment}`};
        }
        return jsonobj.value;
    }
}
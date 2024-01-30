import {useRoute, useRouter} from "vue-router";
import calendars from "@/assets/json/calendars.json";

class Calendar {
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
            if(link === undefined){
                throw {name : "UnknownIdentifierError", message : `Unknown \"${identifier}\" identifier.`};
            }
            this.title = link.title;
            this.url = link.url;
            this.identifier = identifier;
            // TODO
        }
    }
}

export async function fetchCal(identifier) {
    let link = calendars[route.params["cal"]]
    if (link === undefined) {
        return {

            null
        };
    }
    console.log(encodeURIComponent(link.link));
    const response = await fetch("https://horizon.imalonelynerd.fr/api/?url=" + encodeURIComponent(link.link));
    let jsoned = await response.json();
    if (jsoned === undefined || jsoned.hasOwnProperty("error")) {
        return null;
    }
    return jsoned;
}
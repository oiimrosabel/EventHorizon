import { iCalParser } from "assets/code/api/parser";
import * as fs from "node:fs";

const DEFAULT_TTL = 60 * 60 * 2;
const CALENDAR_TOKEN = "%%cal%%";
const WEEKS_TOKEN = "%%weeks%%";
const BASE_URL =
  "https://adecampus.univ-rouen.fr/jsp/custom/modules/plannings/anonymous_cal.jsp?resources=%%cal%%&projectId=0&calType=ical&nbWeeks=%%weeks%%&displayConfigId=8";

const checkItems = (cal: string, weeks: string) =>
  /^\d+$/.test(cal) && /^\d{1,3}$/.test(weeks);

const fetchFile = async (cal: string, weeks: string) => {
  const url = BASE_URL.replace(CALENDAR_TOKEN, cal).replace(WEEKS_TOKEN, weeks);
  try {
    return (await $fetch(url)) as string;
  } catch (e: any) {
    return undefined;
  }
};

export default defineCachedEventHandler(
  async (event) => {
    const query = getQuery(event);
    const cal = query["cal"];
    const weeks = query["weeks"];

    if (!cal || !weeks)
      return setResponseStatus(event, 400, "Paramètres manquants.");
    if (!checkItems(cal as string, weeks as string))
      return setResponseStatus(event, 400, "Requête incorrecte.");
    const file = await fetchFile(cal as string, weeks as string);
    if (!file)
      return setResponseStatus(
        event,
        500,
        "Impossible de récupérer le calendrier.",
      );
    const calData = new iCalParser().parseCal(file);
    if (!calData)
      return setResponseStatus(
        event,
        500,
        "Impossible de parser le calendrier.",
      );
    setResponseStatus(event, 200);
    return calData;
  },
  {
    maxAge: DEFAULT_TTL,
    name: `assets-getter`,
    getKey: (event) =>
      event.context.params ? event.context.params["cal"] : "",
  },
);

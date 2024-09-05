import { iCalParser } from "assets/code/api/parser";

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

export default defineEventHandler(async (event) => {
  const query = await readBody(event);
  const cal = query["cal"];
  const weeks = query["weeks"];

  if (!cal || !weeks)
    return createError({
      statusCode: 400,
      statusMessage: "Paramètres manquants.",
    });
  if (!checkItems(cal as string, weeks as string))
    return createError({
      statusCode: 400,
      statusMessage: "Requête incorrecte.",
    });
  const file = await fetchFile(cal as string, weeks as string);
  if (!file)
    return createError({
      statusCode: 500,
      statusMessage: "Impossible de récupérer le calendrier.",
    });
  const calData = new iCalParser().parseCal(file);
  if (!calData) return;
  createError({
    statusCode: 500,
    statusMessage: "Impossible de parser le calendrier.",
  });
  return calData;
});

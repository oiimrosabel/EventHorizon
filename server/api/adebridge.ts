import { iCalParser } from "~/server/api/_tools/parser";
import axios from "axios";

const checkItems = (cal: string, weeks: string) =>
  /^\d+$/.test(cal) && /^\d{1,3}$/.test(weeks);

const formatBaseUrl = (cal: string, weeks: string) =>
  "https://adecampus.univ-rouen.fr/jsp/custom/modules/plannings/anonymous_cal.jsp" +
  `?resources=${cal}&nbWeeks=${weeks}` +
  "&projectId=0&calType=ical&displayConfigId=8";

const fetchFile = async (cal: string, weeks: string) => {
  try {
    return (await axios.get<string>(formatBaseUrl(cal, weeks))).data;
  } catch (_) {
    return undefined;
  }
};

export default defineEventHandler(async (event) => {
  const query = await readBody(event);
  const cal = (query["cal"] as string) ?? "";
  const weeks = (query["weeks"] as string) ?? "";

  if (!cal || !weeks)
    return createError({
      statusCode: 400,
      message: "Paramètres manquants.",
    });
  if (!checkItems(cal as string, weeks as string))
    return createError({
      statusCode: 400,
      message: "Requête incorrecte.",
    });
  const file = await fetchFile(cal, weeks);
  if (!file)
    return createError({
      statusCode: 500,
      message: "Impossible de récupérer le calendrier.",
    });
  const calData = new iCalParser(Number(weeks)).parseCal(file);
  if (!calData)
    return createError({
    statusCode: 500,
    message: "Impossible de parser le calendrier.",
  });
  return calData;
});

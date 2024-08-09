import Tokenizr from "tokenizr";

export const VCALSTART = "vcs";
export const VCALEND = "vce";
export const EVENTSTART = "evs";
export const EVENTEND = "eve";
export const TIMESTART = "tts";
export const TIMEEND = "tte";
export const SUMMARY = "sum";
export const LOCATION = "loc";
export const TEACHERS = "dsc";

const TIMEZONE_OFFSET = new Date().getTimezoneOffset() * 60 * 1000 * -1;

const cleanString = (str: string) => str.trim().replaceAll("\\", "");

const formatDate = (match: RegExpExecArray) => {
  const time = new Date(
    parseInt(match[1]!),
    parseInt(match[2]!) - 1,
    parseInt(match[3]!),
    parseInt(match[4]!),
    parseInt(match[5]!),
  );
  time.setTime(time.getTime() + TIMEZONE_OFFSET);
  return time;
};

const iCalLexer = new Tokenizr();

iCalLexer.rule(/BEGIN:VCALENDAR\s+/, (ctx) => {
  ctx.accept(VCALSTART);
});

iCalLexer.rule(/END:VCALENDAR\s+/, (ctx) => {
  ctx.accept(VCALEND);
});

iCalLexer.rule(/BEGIN:VEVENT\s+/, (ctx) => {
  ctx.accept(EVENTSTART);
});

iCalLexer.rule(/END:VEVENT\s+/, (ctx) => {
  ctx.accept(EVENTEND);
});

iCalLexer.rule(
  /DTSTART:(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})\d{2}Z\s+/,
  (ctx, match) => {
    ctx.accept(TIMESTART, formatDate(match));
  },
);

iCalLexer.rule(
  /DTEND:(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})\d{2}Z\s+/,
  (ctx, match) => {
    ctx.accept(TIMEEND, formatDate(match));
  },
);

iCalLexer.rule(/SUMMARY:(.*)\s+/, (ctx, match) => {
  const cleanedData = cleanString(match[1]!);
  let ret: string[];
  const matches = /((?:CM|TD|TP|CC)\d?) (.*)/.exec(cleanedData);
  if (!matches || matches.length !== 3) ret = [cleanedData, ""];
  else ret = [cleanedData, matches[1]!];
  ctx.accept(SUMMARY, ret);
});

iCalLexer.rule(/LOCATION:(.*)\s+/, (ctx, match) => {
  ctx.accept(
    LOCATION,
    cleanString(match[1]!.replaceAll(/ *\([^)]*\)/g, "")).split(","),
  );
});

iCalLexer.rule(/DESCRIPTION:(.*)\s+/, (ctx, match) => {
  const ret = [];
  const matches = [...match[1]!.matchAll(/([A-Z ]+)\\n/g)];
  for (const match of matches) ret.push(match[1]);
  ctx.accept(TEACHERS, ret);
});

iCalLexer.rule(/.+/, (ctx) => {
  ctx.ignore();
});

iCalLexer.rule(/\s+/, (ctx) => {
  ctx.ignore();
});

export { iCalLexer };

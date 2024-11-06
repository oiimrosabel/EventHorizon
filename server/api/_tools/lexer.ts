import Tokenizr from "tokenizr";
import {
  EVENTEND,
  EVENTSTART,
  LOCATION,
  SUMMARY,
  TEACHERS,
  TIMEEND,
  TIMESTART,
  VCALEND,
  VCALSTART,
} from "~/server/api/_tools/common";

const TIMEZONE_CODE = "Europe/Paris";

const cleanString = (str: string) => str.trim().replaceAll("\\", "");

const toISO = (m: RegExpExecArray) =>
  `${m[1] ?? "2000"}-${m[2] ?? "01"}-${m[3] ?? "01"}T${m[4] ?? "00"}:${m[5] ?? "00"}Z`;

const isoToDate = (match: RegExpExecArray) => {
  return new Date(
    new Date(toISO(match)).toLocaleString("en-US", { timeZone: TIMEZONE_CODE }),
  );
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
  /DTSTART:(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})\d{2}Z?\s+/,
  (ctx, match) => {
    ctx.accept(TIMESTART, isoToDate(match));
  },
);

iCalLexer.rule(
  /DTEND:(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})\d{2}Z?\s+/,
  (ctx, match) => {
    ctx.accept(TIMEEND, isoToDate(match));
  },
);

iCalLexer.rule(/SUMMARY:(.*)\s+/, (ctx, match) => {
  const cleanedData = cleanString(match[1]!);
  let ret: string[];
  const matches = /(CM|TD|TP|CC)\d? (.*)/.exec(cleanedData);
  if (!matches || matches.length !== 3) ret = [cleanedData, "", cleanedData];
  else ret = [cleanedData, matches[1], matches[2]];
  ctx.accept(SUMMARY, ret);
});

iCalLexer.rule(/LOCATION:(.*)\s+/, (ctx, match) => {
  ctx.accept(
    LOCATION,
    cleanString(match[1]!.replaceAll(/ *\([^)]*\)/g, ""))
      .split(",")
      .filter((value) => value !== ""),
  );
});

iCalLexer.rule(/DESCRIPTION:(.*)\s+/, (ctx, match) => {
  const upperTest = /^([A-Z]+(?:-[A-Z]+)*(?: [A-Z]+(?:-[A-Z]+)*)+)$/;
  const ret = [];
  const parts = match[1].split("\\n");
  for (const part of parts) if (upperTest.test(part)) ret.push(part);
  ctx.accept(TEACHERS, ret);
});

iCalLexer.rule(/.+/, (ctx) => {
  ctx.ignore();
});

iCalLexer.rule(/\s+/, (ctx) => {
  ctx.ignore();
});

export { iCalLexer };

import { Buffer } from "buffer";

//window.Buffer = window.Buffer || require("buffer").Buffer;
const units = ["B", "kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

export const findBestUnit = (bytes: number, base = 1000) => {
  const i = bytes > 0 ? Math.floor(Math.log(bytes) / Math.log(base)) : 0;
  const si = Math.min(i, units.length - 1); // safe index

  return { unit: units[si], value: bytes / base ** si };
};

export const convertUnits = (bytes: number, base = 1000) => {
  const { unit, value } = findBestUnit(bytes, base);

  return value.toFixed(2) + unit;
};

export const toBase64 = (obj: any): string => {
  // converts the obj to a string
  const str = JSON.stringify(obj);
  // returns string converted to base64
  const b64string = Buffer.from(str).toString("base64");
  return b64string.replace(/[=+/]/g, (charToBeReplaced: string) => {
    switch (charToBeReplaced) {
      case "=":
        return "";
      case "+":
        return "-";
      case "/":
        return "_";
      default:
        return "";
    }
  });
};

export const getRelativeTimeString = (
  date: Date | number,
  lang = navigator.language
): string => {
  // Allow dates or times to be passed
  const timeMs = typeof date === "number" ? date : date.getTime();

  // Get the amount of seconds between the given date and now
  const deltaSeconds = Math.round((timeMs - Date.now()) / 1000);

  // Array reprsenting one minute, hour, day, week, month, etc in seconds
  const cutoffs = [
    60,
    3600,
    86400,
    86400 * 7,
    86400 * 30,
    86400 * 365,
    Infinity
  ];

  // Array equivalent to the above but in the string representation of the units
  const units: Intl.RelativeTimeFormatUnit[] = [
    "second",
    "minute",
    "hour",
    "day",
    "week",
    "month",
    "year"
  ];

  // Grab the ideal cutoff unit
  const unitIndex = cutoffs.findIndex(
    (cutoff) => cutoff > Math.abs(deltaSeconds)
  );

  // Get the divisor to divide from the seconds. E.g. if our unit is "day" our divisor
  // is one day in seconds, so we can divide our seconds by this to get the # of days
  const divisor = unitIndex ? cutoffs[unitIndex - 1] : 1;

  // Intl.RelativeTimeFormat do its magic
  const rtf = new Intl.RelativeTimeFormat(lang, { numeric: "auto" });
  return rtf.format(Math.floor(deltaSeconds / divisor), units[unitIndex]);
};

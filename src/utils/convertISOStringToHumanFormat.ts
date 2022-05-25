import { DateTime } from "luxon";

export const convertISOStringToHumanFormat = (time: any) => {
  const date = DateTime.fromJSDate(new Date(time)).plus({ hour: 2 }).toJSDate();

  const humanFormat = Intl.DateTimeFormat("en-UK", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date);

  return `${humanFormat}`;
};

export const complianceFormatConvertISOStringToHumanFormat = (time: any) => {
  const date = new Date(time);

  const humanFormat = Intl.DateTimeFormat("en-UK", {
    dateStyle: "short",
  }).format(date);

  return `${humanFormat}`;
};

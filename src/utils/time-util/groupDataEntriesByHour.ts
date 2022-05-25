import { DateTime } from "luxon";

export type Input = Array<{
  computerName: string;
  applicationName: string;
  applicationUtilizationStart: string;
  applicationUtilizationEnd: string;
}>;

export type Output = Map<number, Map<string, number>>;

export function groupDataEntriesByHour(input: Input, date: DateTime): Output {
  const output: Output = new Map();

  for (const appUtil of input) {
    const appName = appUtil.applicationName;
    let start = DateTime.fromISO(appUtil.applicationUtilizationStart);
    let end = DateTime.fromISO(appUtil.applicationUtilizationEnd);

    // clip
    if (start < date.startOf("day")) {
      start = date.startOf("day");
    }
    if (end > date.endOf("day")) {
      end = date.endOf("day");
    }

    while (start <= end) {
      const currentHourEnd =
        start.hour === end.hour ? end : start.plus({ hour: 1 }).startOf("hour");

      const millis = currentHourEnd.toMillis() - start.toMillis();

      const hourMap = output.get(start.hour);
      if (hourMap === undefined) {
        output.set(start.hour, new Map([[appName, millis]]));
      } else {
        const appMillis = hourMap.get(appName);
        if (appMillis === undefined) {
          hourMap.set(appName, millis);
        } else {
          hourMap.set(appName, appMillis + millis);
        }
      }

      start = start.plus({ hour: 1 }).startOf("hour");
    }
  }
  return output;
}

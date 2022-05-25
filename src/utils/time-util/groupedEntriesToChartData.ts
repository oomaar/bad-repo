import { GoogleDataTableColumn } from "react-google-charts";
import { map12To24 } from "./map12to24";
import { TimeUtil } from "../../client/AuthedClient";
import { Output } from "./groupDataEntriesByHour";

export type ChartData = Array<
  Array<string | GoogleDataTableColumn | number | undefined>
>;

export function groupedEntriesToChartData(
  filteredTimeUtilData: Array<TimeUtil>,
  hourToAppNameToDuration: Output,
  appsNames: Array<string>
): ChartData {
  const googleDataTableColumns: Array<GoogleDataTableColumn> = appsNames.map(
    (appName) => ({ type: "number", label: appName })
  );

  const chartData: Array<
    Array<string | GoogleDataTableColumn | number | undefined>
  > = [["names", ...googleDataTableColumns]];

  for (let hour = 0; hour < 24; hour++) {
    const appNameToDuration = hourToAppNameToDuration.get(hour);

    const appsDurations: Array<number | undefined> =
      appNameToDuration === undefined
        ? appsNames.map(() => undefined)
        : appsNames.map((appName) => {
            const duration = appNameToDuration.get(appName);
            if (duration === undefined) {
              return undefined;
            } else {
              const durationFloor = Math.floor(duration / 1000 / 60);
              if (durationFloor === 0.0) {
                return undefined;
              } else {
                return durationFloor;
              }
            }
          });

    chartData.push([map12To24(hour.toString()) as string, ...appsDurations]);
  }

  removeColumnsOfUndefineds(chartData);

  return chartData;
}

function removeColumnsOfUndefineds(chartData: ChartData) {
  for (let col = 1; col < chartData[0].length; col++) {
    let isAllRowsUndefined = true;
    for (let row = 1; row < chartData.length; row++) {
      if (chartData[row][col] !== undefined) {
        isAllRowsUndefined = false;
      }
    }

    if (isAllRowsUndefined) {
      for (let row = 0; row < chartData.length; row++) {
        chartData[row].splice(col, 1);
      }

      // To stay on the same column now that column `col + 1` is now in `col`.
      // So, `col--` should negate the `col++` and achieve the effect of staying
      col--;
    }
  }
}

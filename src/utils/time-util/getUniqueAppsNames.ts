import { TimeUtil } from "../../client/AuthedClient";

export function getUniqueAppsNames(filteredTimeUtilData: Array<TimeUtil>) {
  const appsNamesSet = new Set<string>();

  for (const timeUtil of filteredTimeUtilData) {
    appsNamesSet.add(timeUtil.applicationName);
  }

  return Array.from(appsNamesSet);
}

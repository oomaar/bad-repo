import { DateTime } from "luxon";
// import { EGYPT_TIMEZONE_OFFSET } from "./constants";

describe("DateTime", () => {
  test("setZone should change day correctly", () => {
    const isoString = "2022-02-20T23:00:00";
    const dateTime = DateTime.fromISO(isoString, { zone: "UTC" });

    const dateTimeInEgyptTimezone = dateTime.setZone(
      `UTC+${2}`
    );

    expect(dateTimeInEgyptTimezone.day).toEqual(21);
  });
});

export {};

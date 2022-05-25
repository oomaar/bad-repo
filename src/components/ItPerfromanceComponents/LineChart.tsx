import { Chart } from "react-google-charts";

export const LineChart = ({
  lineData,
  title,
}: {
  lineData: any;
  title: string;
}) => {
  const arrData: any = [];
  arrData.push([`time in ${lineData.TimeLabel}`, title]);
  lineData.data.map((el: any) => {
    let dataArr = [];
    dataArr.push(
      `${el.xValue.slice(el.xValue.length - 5, el.xValue.length)}`,
      el.yValue
    );
    arrData.push(dataArr);
    dataArr = [];
    return 0;
  });

  return (
    <div className="col-xl-12">
      <div className="chart-box">
        <Chart
          chartType="LineChart"
          options={{
            chartArea: {
              width: "96%",
            },
            curveType: "function",
            legend: { position: "top", alignment: "center" },
            hAxis: {
              maxAlternation: 1,
              title: `Time in ${lineData.TimeLabel}s`,
            },
            vAxis: {
              viewWindow: {
                min: 0,
              },
            },
          }}
          data={arrData}
          width={"100%"}
          height={300}
          formatters={[
            { type: "NumberFormat", column: 1, options: { fractionDigits: 5 } },
          ]}
        ></Chart>
      </div>
    </div>
  );
};

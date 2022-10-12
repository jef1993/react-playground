import React, { Component } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import moment from "moment/moment";
import { isClickableInput } from "@testing-library/user-event/dist/utils";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DateChart = () => {
  // const dataGenerator = (startDate, endDate, dataCount, totalRange) => {
  //   const output = [];
  //   for (let i = 0; i < dataCount; i++) {

  //   }
  // };

  const data = [
    { date: "2021-02-05", total: 23 },
    { date: "2021-03-04", total: 11 },
    { date: "2021-03-11", total: 70 },
    { date: "2021-06-08", total: 34 },
    { date: "2022-01-01", total: 23 },
    { date: "2022-01-02", total: 44 },
    { date: "2022-01-03", total: 47 },
    { date: "2022-02-01", total: 54 },
    { date: "2022-02-03", total: 102 },
    { date: "2022-04-11", total: 123 },
    { date: "2022-05-01", total: 52 },
    { date: "2022-06-22", total: 18 },
    { date: "2022-06-23", total: 12 },
    { date: "2022-08-01", total: 5 },
    { date: "2022-08-02", total: 13 },
    { date: "2022-09-01", total: 18 },
  ];

  const dataTransformer = (
    data = [],
    displayType = "day",
    hasEmpty = false,
    toDate = new Date(),
    fromDate = new Date()
  ) => {
    if (data.length === 0 || !data) return [];
    let convertedData = data.map((data) => {
      return { label: data.date, value: data.total };
    });
    const addEmptyDate = (data = []) => {
      let output = [];
      if (data.length > 0) {
        let now = toDate;
        while (now >= fromDate) {
          const nowToStr = moment(now).format("YYYY-MM-DD");
          const findData = data.find((obj) => obj.date === nowToStr);
          output.unshift({
            label: nowToStr,
            value: findData ? findData.total : 0,
          });
          now -= 1000 * 60 * 60 * 24;
        }
      }
      return output;
    };
    if (hasEmpty) {
      convertedData = addEmptyDate(data);
    }
    console.log(convertedData);

    if (displayType === "week") {
      const weekData = convertedData.map((date) => {
        return {
          ...date,
          label: moment(date.label).weekday(1).format("YYYY-MM-DD"),
        };
      });
      console.log(weekData);
      let weekConvertedData = [
        ...new Set(weekData.map((data) => data.label)),
      ].map((str) => {
        return { label: str, value: 0 };
      });
      weekData.forEach((obj) => {
        weekConvertedData = weekConvertedData.map((data) => {
          return {
            label: data.label,
            value:
              data.label === obj.label ? data.value + obj.value : data.value,
          };
        });
      });
      convertedData = weekConvertedData;
    }
    // console.log(convertedData);
    return convertedData;
  };

  console.log(moment("2022-10-15").weekday(1).format("YYYY-MM-DD"));

  const displayData = dataTransformer(
    data,
    "week",
    false,
    moment(),
    moment(data.length > 0 ? data[0].date : "")
  );
  const displayLabel =
    data.length > 0 ? displayData.map((data) => data.label) : [];
  const displayValue =
    data.length > 0 ? displayData.map((data) => data.value) : [];

  const options = {
    turnsponsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Chart.js Bar Chart",
      },
    },
    scales: {
      x: {
        ticks: {
          // callback: (value, index, ticks) => {
          //   return displayValue[index] > 0 ? displayLabel[index] : "";
          // },
        },
      },
    },
  };

  const chartData = {
    labels: displayLabel,
    datasets: [
      {
        label: "Dataset 1",
        data: displayValue,
        backgroundColor: "rgba(255, 99, 132)",
      },
    ],
  };

  return <Line options={options} data={chartData} />;
};

export default DateChart;

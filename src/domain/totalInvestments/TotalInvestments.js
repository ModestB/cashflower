import React from "react";
import MainContainer from "../../components/mainContainer/MainContainer";

const tableColumns = {
  columns: [
    {
      id: "date",
      label: "Year",
      editable: false,
      inputType: "date",
      dateFormat: "YYYY",
      minWidth: 170,
    },
    {
      id: "p2p",
      label: "P2P",
      editable: false,
      inputType: "number",
      countable: true,
      countableSummary: true,
      minWidth: 100,
    },
    {
      id: "stocks",
      label: "Stocks",
      editable: false,
      inputType: "number",
      countable: true,
      countableSummary: true,
      minWidth: 100,
    },
    {
      id: "total",
      label: "Total",
      editable: false,
      inputType: "number",
      countableTotal: true,
      countableSummary: true,
      minWidth: 100,
    },
  ],
  tableOptions: {
    totalSummary: true,
  },
};

const tableData = [
  { id: "1", date: "2019-05-12", p2p: 850, stocks: 400, total: "" },
  { id: "2", date: "2011-05-12", p2p: 50, stocks: 400, total: "" },
  { id: "3", date: "2015-05-12", p2p: 900, stocks: 300, total: "" },
  { id: "4", date: "2018-05-12", p2p: 100, stocks: 400, total: "" },
  { id: "5", date: "2020-05-12", p2p: 200, stocks: 400, total: "" },
  { id: "5", date: "2020-05-12", p2p: 200, stocks: 400, total: "" },
  { id: "5", date: "2020-05-12", p2p: 200, stocks: 400, total: "" },
  { id: "5", date: "2020-05-12", p2p: 200, stocks: 400, total: "" },
  { id: "5", date: "2020-05-12", p2p: 200, stocks: 400, total: "" },
  { id: "5", date: "2020-05-12", p2p: 200, stocks: 400, total: "" },
  { id: "5", date: "2020-05-12", p2p: 200, stocks: 400, total: "" },
];

const TotatInvestments = () => (
  <MainContainer tableColumns={tableColumns} tableData={tableData} />
);

export default TotatInvestments;

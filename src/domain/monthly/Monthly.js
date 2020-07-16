import React from "react";

import MainContainer from "../../components/mainContainer/MainContainer";

const columns = [
  {
    id: "date",
    label: "Date",
    editable: true,
    inputType: "date",
    minWidth: 170,
  },
  {
    id: "amount",
    label: "Amount",
    editable: true,
    inputType: "number",
    minWidth: 100,
  },
  {
    id: "type",
    label: "Type of Investment",
    selectType: "investment",
    editable: true,
    inputType: "select",
    inputOptions: [
      { value: "", label: "None" },
      { value: "p2p", label: "P2P" },
      { value: "etf", label: "ETF" },
      { value: "stocks", label: "Stocks" },
      { value: "interest", label: "Interest" },
    ],
    minWidth: 170,
  },
  {
    id: "comment",
    label: "Comment",
    editable: true,
    inputType: "textArea",
    minWidth: 170,
    colspan: 2,
  },
  {
    id: "edit",
    label: "",
    minWidth: 50,
  },
];

const tableData = [
  { id: "1", date: "2019-05-12", amount: 950, type: "P2P", comment: "" },
  { id: "2", date: "2011-05-12", amount: 40, type: "ETH", comment: "" },
  { id: "3", date: "2015-05-12", amount: 500, type: "P2P", comment: "" },
  { id: "4", date: "2018-05-12", amount: 400, type: "P2P", comment: "" },
  { id: "5", date: "2020-05-12", amount: 600, type: "P2P", comment: "" },
];

const Monthly = () => {
  return (
    <MainContainer
      columns={columns}
      tableData={tableData}
      submitBtnLabel="Add Investment"
    />
  );
};

export default Monthly;

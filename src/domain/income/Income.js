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
    label: "Income type",
    editable: true,
    inputType: "select",
    inputOptions: [
      { value: "", label: "None" },
      { value: "winnings", label: "Winnings" },
      { value: "salary", label: "Salary" },
      { value: "gift", label: "Gift" },
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
  },
  {
    id: "edit",
    label: "",
    minWidth: 50,
  },
];

const tableData = [
  { id: "1", date: "2019-05-12", amount: 900, type: "Salary", comment: "" },
  { id: "2", date: "2011-05-12", amount: 900, type: "Salary", comment: "" },
  { id: "3", date: "2015-05-12", amount: 900, type: "Salary", comment: "" },
  { id: "4", date: "2018-05-12", amount: 900, type: "Salary", comment: "" },
  { id: "5", date: "2020-05-12", amount: 900, type: "Salary", comment: "" },
];

function Income() {
  return (
    <MainContainer
      columns={columns}
      tableData={tableData}
      submitBtnLabel="Add Income"
    />
  );
}

export default Income;

import React from "react";

import MainContainer from "../../components/mainContainer/MainContainer";

const tableColumns = {
  columns: [
    {
      id: "date",
      label: "Date",
      editable: true,
      inputType: "date",
      dateFormat: "YYYY",
      minWidth: 170,
    },
    {
      id: "minPlan",
      label: "Min. Plan",
      editable: true,
      inputType: "number",
      minWidth: 100,
    },
    {
      id: "yearlyPlan",
      label: "Yearly Plan",
      editable: true,
      inputType: "number",
      minWidth: 100,
    },
    {
      id: "invested",
      label: "Invested",
      editable: false,
      inputType: "number",
      minWidth: 100,
    },
  ],
};

const tableData = [
  { id: "1", date: "2019-05-12", minPlan: 900, yearlyPlan: 1250, invested: "" },
  { id: "2", date: "2011-05-12", minPlan: 900, yearlyPlan: 1250, invested: "" },
  { id: "3", date: "2015-05-12", minPlan: 900, yearlyPlan: 1250, invested: "" },
  { id: "4", date: "2018-05-12", minPlan: 900, yearlyPlan: 1250, invested: "" },
  { id: "5", date: "2020-05-12", minPlan: 900, yearlyPlan: 1250, invested: "" },
];

function Plans() {
  return (
    <MainContainer
      tableColumns={tableColumns}
      tableData={tableData}
      submitBtnLabel="Add Plan"
    />
  );
}

export default Plans;

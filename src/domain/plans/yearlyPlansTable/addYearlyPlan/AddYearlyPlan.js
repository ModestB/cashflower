import React, { useState, useEffect } from "react";
import AddData from "../../../../components/dataTable/addData/AddData";

export default function AddYearlyPlan(props) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [minPlan, setMinPlan] = useState(null);
  const [yearlyPlan, setYearlyPlan] = useState(null);

  useEffect(() => {
    if (props.row) {
      if (props.row['date']) setSelectedDate(new Date(props.row['date']));
      if (props.row['minPlan']) setMinPlan(props.row['minPlan']);
      if (props.row['yearlyPlan']) setYearlyPlan(props.row['yearlyPlan']);
    }

  }, [props.row, props.date, props.minPlan, props.yearlyPlan]);

  const handleMinPlanChange = (event) => {
    setMinPlan(event.target.value);
  };

  const handleYearlyPlanChange = (event) => {
    setYearlyPlan(event.target.value);
  };

  const addDataHandler = () => {
    const formatedData =  {
      date: selectedDate.toISOString().split("T")[0],
      minPlan: minPlan,
      yearlyPlan: yearlyPlan,
    }

    if (props.row) {
      props.editHandler(
        formatedData,
        props.row.id
      );
    } else {
      props.submitHandler(formatedData);
    }
  };

  const dataChangeHandlers = {
    'date':  setSelectedDate,
    'minPlan': handleMinPlanChange,
    'yearlyPlan': handleYearlyPlanChange
  }

  const dataValues = {
    'date':  selectedDate,
    'minPlan': minPlan,
    'yearlyPlan': yearlyPlan
  }

  return (
    <AddData 
      cancelHandler={props.cancelHandler}
      submitHandler={props.row ? props.editDataHandler: props.submitHandler}
      submitButtonLabel={props.submitButtonLabel}
      columns={props.columns}
      dataChangeHandlers={dataChangeHandlers}
      dataValues={dataValues}
      addDataHandler={addDataHandler}
      emptyCellSpan={2}
    />
  );
}

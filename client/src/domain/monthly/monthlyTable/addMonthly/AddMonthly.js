import React, { useState, useEffect } from "react";
import AddData from "../../../../components/dataTable/addData/AddData";

export default function AddIcome(props) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [amount, setAmount] = useState(null);
  const [type, setType] = useState(null);
  const [comment, setComment] = useState('');

  useEffect(() => {
    if (props.row) {
      if (props.row['date']) setSelectedDate(new Date(props.row['date']));
      if (props.row['amount']) setAmount(props.row['amount']);
      if (props.row['type']) {
        setType(props.row['type'].toLowerCase())
      };
      if (props.row['comment']) setComment(props.row['comment']);
    }

  }, [props.row, props.date, props.amount, props.type, props.comment]);

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const addDataHandler = () => {
    const formatedData =  {
      date: selectedDate.toISOString().split("T")[0],
      amount: amount,
      type: type,
      comment: comment
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
    'amount': handleAmountChange,
    'type': handleTypeChange,
    'comment': handleCommentChange
  }

  const dataValues = {
    'date':  selectedDate,
    'amount': amount,
    'type': type,
    'comment': comment
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
    />
  );
}

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { incomeTypeAddRequest, incomeTypeDeleteRequest } from "../../../../store/actions/actions";
import AddData from "../../../../components/dataTable/addData/AddData";

export default function AddIcome(props) {
  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = useState(new Date()); 
  const [amount, setAmount] = useState(null);
  const [type, setType] = useState(null);
  const [comment, setComment] = useState('');
  const [id, setId] = useState(null);
  const userId = useSelector(state => state.auth.userId);
  const incomeTypes = useSelector(state => state.income.types);

  useEffect(() => {
    if (props.row) {
      if (props.row['id']) setId(props.row['id'])
      if (props.row['date']) setSelectedDate(new Date(props.row['date']));
      if (props.row['amount']) setAmount(props.row['amount']);
      if (props.row['type']) {
        setType(props.row['type'].toLowerCase())
      };
      if (props.row['comment']) setComment(props.row['comment']);
    }

  }, [props.id, props.row, props.date, props.amount, props.type, props.comment]);

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
      id,
      date: selectedDate.toISOString().split("T")[0],
      amount: amount,
      type: type,
      comment: comment,
    };

    if (props.row) {
      props.editHandler(
        formatedData,
        props.row.id
      );
    } else {
      props.submitHandler(formatedData, userId);
    }
  };

  const addTypeHandler = (userId, type) => {
    dispatch(incomeTypeAddRequest(userId, type));
  };

  const deleteTypeHandler = (key, userId) => {
    dispatch(incomeTypeDeleteRequest(key, userId));
  }

  const dataChangeHandlers = {
    'date':  setSelectedDate,
    'amount': handleAmountChange,
    'type': handleTypeChange,
    'comment': handleCommentChange
  };

  const dataValues = {
    'date':  selectedDate,
    'amount': amount,
    'type': type,
    'comment': comment
  };

  const selectOptions = {
    'type': incomeTypes
  };

  return (
    <AddData 
      cancelHandler={props.cancelHandler}
      submitButtonLabel={props.submitButtonLabel}
      columnsSettings={props.columnsSettings}
      dataChangeHandlers={dataChangeHandlers}
      dataValues={dataValues}
      addDataHandler={addDataHandler}
      addTypeHandler={addTypeHandler}
      deleteTypeHandler={deleteTypeHandler}
      selectOptions={selectOptions}
    />
  );
}

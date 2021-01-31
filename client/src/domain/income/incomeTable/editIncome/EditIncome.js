import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { incomeTypeAddRequest, incomeTypeDeleteRequest } from '../../../../store/actions/actions';
import EditData from '../../../../components/dataTable/editData/EditData';

function EditIncome({
  row,
  editHandler,
  cancelHandler,
  submitButtonLabel,
}) {
  const incomeTypes = useSelector(state => state.dataInfo.types.income);
  const incomeTypeAddLoading = useSelector(state => state.dataInfo.loading.typeAdd);
  const incomeTypeDeleteLoading = useSelector(state => state.dataInfo.loading.typeDelete);
  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [amount, setAmount] = useState('');
  const [type, setType] = useState(Object.keys(incomeTypes)[0]);
  const [comment, setComment] = useState('');

  useEffect(() => {
    if (row) {
      if (row.date) setSelectedDate(new Date(row.date));
      if (row.amount) setAmount(row.amount);
      if (row.type) {
        setType(row.type.toLowerCase());
      }
      if (row.comment) setComment(row.comment);
    }
  }, [row]);

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const editDataHandler = () => {
    const formatedData = {
      date: selectedDate.toISOString().split('T')[0],
      amount,
      type,
      comment,
    };

    editHandler(
      formatedData,
      row.id,
    );
  };

  const addTypeHandler = (uid, incomeType) => {
    dispatch(incomeTypeAddRequest(uid, incomeType));
  };

  const deleteTypeHandler = (key, uid) => {
    dispatch(incomeTypeDeleteRequest(key, uid));
  };

  const dataChangeHandlers = {
    date: setSelectedDate,
    amount: handleAmountChange,
    type: handleTypeChange,
    comment: handleCommentChange,
  };

  const dataValues = {
    date: selectedDate,
    amount,
    type,
    comment,
  };

  const selectOptions = {
    type: incomeTypes,
  };

  return (
    <EditData
      cancelHandler={cancelHandler}
      submitButtonLabel={submitButtonLabel}
      dataChangeHandlers={dataChangeHandlers}
      dataValues={dataValues}
      editDataHandler={editDataHandler}
      addTypeHandler={addTypeHandler}
      deleteTypeHandler={deleteTypeHandler}
      selectOptions={selectOptions}
      selectAddLoading={incomeTypeAddLoading}
      selectDeleteLoading={incomeTypeDeleteLoading}
    />
  );
}

EditIncome.propTypes = {
  row: PropTypes.oneOfType([PropTypes.object]).isRequired,
  editHandler: PropTypes.func.isRequired,
  cancelHandler: PropTypes.func,
  submitButtonLabel: PropTypes.string,
};

EditIncome.defaultProps = {
  submitButtonLabel: 'Save Income',
  cancelHandler: () => {},
};

export default EditIncome;

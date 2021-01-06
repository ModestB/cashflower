import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { incomeTypeAddRequest, incomeTypeDeleteRequest } from '../../../../store/actions/actions';
import AddDataModal from '../../../../components/dataTable/addDataModal/AddDataModal';

function AddIcome({
  columnsSettings,
  submitButtonLabel,
  cancelHandler,
  submitHandler,
  openModal,
  openModalHandler,
}) {
  const dispatch = useDispatch();
  const userId = useSelector(state => state.auth.userId);
  const incomeTypes = useSelector(state => state.income.types);
  const incomeTypeAddLoading = useSelector(state => state.income.incomeTypeAddLoading);
  const incomeTypeDeleteLoading = useSelector(state => state.income.incomeTypeDeleteLoading);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [amount, setAmount] = useState('');
  const [type, setType] = useState(Object.keys(incomeTypes)[0]);
  const [comment, setComment] = useState(' ');

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
    const formatedData = {
      date: selectedDate.toISOString().split('T')[0],
      amount,
      type,
      comment,
    };

    submitHandler(formatedData, userId);
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
    <AddDataModal
      dataValues={dataValues}
      cancelHandler={cancelHandler}
      submitButtonLabel={submitButtonLabel}
      columnsSettings={columnsSettings}
      dataChangeHandlers={dataChangeHandlers}
      addDataHandler={addDataHandler}
      addTypeHandler={addTypeHandler}
      deleteTypeHandler={deleteTypeHandler}
      selectOptions={selectOptions}
      selectAddLoading={incomeTypeAddLoading}
      selectDeleteLoading={incomeTypeDeleteLoading}
      openModal={openModal}
      openModalHandler={openModalHandler}
    />
  );
}

AddIcome.propTypes = {
  submitHandler: PropTypes.func.isRequired,
  cancelHandler: PropTypes.func.isRequired,
  submitButtonLabel: PropTypes.string.isRequired,
  columnsSettings: PropTypes.oneOfType([PropTypes.object]).isRequired,
  openModal: PropTypes.bool.isRequired,
  openModalHandler: PropTypes.func.isRequired,
};

export default AddIcome;
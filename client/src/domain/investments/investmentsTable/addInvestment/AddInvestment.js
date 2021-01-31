import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { investmentTypeAddRequest, investmentTypeDeleteRequest } from '../../../../store/actions/actions';
import AddDataModal from '../../../../components/dataTable/addDataModal/AddDataModal';

function AddInvestment({
  submitButtonLabel,
  cancelHandler,
  submitHandler,
  openModal,
  openModalHandler,
}) {
  const dispatch = useDispatch();
  const userId = useSelector(state => state.auth.userId);
  const investmentTypes = useSelector(state => state.dataInfo.types.investment);
  const investmentTypeAddLoading = useSelector(state => state.dataInfo.loading.typeAdd);
  const investmentTypeDeleteLoading =
    useSelector(state => state.dataInfo.loading.typeDelete);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [amount, setAmount] = useState('');
  const [type, setType] = useState(Object.keys(investmentTypes)[0]);
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

  const addTypeHandler = (uid, investmentType) => {
    dispatch(investmentTypeAddRequest(uid, investmentType));
  };

  const deleteTypeHandler = (key, uid) => {
    dispatch(investmentTypeDeleteRequest(key, uid));
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
    type: investmentTypes,
  };

  return (
    <AddDataModal
      dataValues={dataValues}
      cancelHandler={cancelHandler}
      submitButtonLabel={submitButtonLabel}
      dataChangeHandlers={dataChangeHandlers}
      addDataHandler={addDataHandler}
      addTypeHandler={addTypeHandler}
      deleteTypeHandler={deleteTypeHandler}
      selectOptions={selectOptions}
      selectAddLoading={investmentTypeAddLoading}
      selectDeleteLoading={investmentTypeDeleteLoading}
      openModal={openModal}
      openModalHandler={openModalHandler}
    />
  );
}

AddInvestment.defaultProps = {
  submitHandler: () => {},
  cancelHandler: () => {},
  submitButtonLabel: '',
  openModal: () => {},
  openModalHandler: () => {},
};

AddInvestment.propTypes = {
  submitHandler: PropTypes.func,
  cancelHandler: PropTypes.func,
  submitButtonLabel: PropTypes.string,
  openModal: PropTypes.bool,
  openModalHandler: PropTypes.func,
};

export default AddInvestment;

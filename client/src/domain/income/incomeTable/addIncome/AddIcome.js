import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { incomeTypeAddRequest, incomeTypeDeleteRequest } from '../../../../store/actions/actions';
import AddDataModal from '../../../../components/dataTable/addDataModal/AddDataModal';
import useChangeTableData from '../../../../shared/hooks/useChangeTableData';

function AddIcome({
  submitButtonLabel,
  cancelHandler,
  submitHandler,
  openModal,
  openModalHandler,
}) {
  const dispatch = useDispatch();
  const userId = useSelector(state => state.auth.userId);
  const incomeTypes = useSelector(state => state.dataInfo.types.income);
  const incomeTypeAddLoading = useSelector(state => state.dataInfo.loading.typeAdd);
  const incomeTypeDeleteLoading = useSelector(state => state.dataInfo.loading.typeDelete);
  const {
    values,
    valuesChangeHandlers,
    saveDataHandler,
    selectItems,
  } = useChangeTableData({
    userId,
    submitHandler,
    types: incomeTypes,
  });

  const addTypeHandler = (uid, incomeType) => {
    dispatch(incomeTypeAddRequest(uid, incomeType));
  };

  const deleteTypeHandler = (key, uid) => {
    dispatch(incomeTypeDeleteRequest(key, uid));
  };

  return (
    <AddDataModal
      dataValues={values}
      cancelHandler={cancelHandler}
      submitButtonLabel={submitButtonLabel}
      dataChangeHandlers={valuesChangeHandlers}
      addDataHandler={saveDataHandler}
      addTypeHandler={addTypeHandler}
      deleteTypeHandler={deleteTypeHandler}
      selectOptions={selectItems}
      selectAddLoading={incomeTypeAddLoading}
      selectDeleteLoading={incomeTypeDeleteLoading}
      openModal={openModal}
      openModalHandler={openModalHandler}
    />
  );
}

AddIcome.defaultProps = {
  submitHandler: () => {},
  cancelHandler: () => {},
  submitButtonLabel: '',
  openModal: () => {},
  openModalHandler: () => {},
};

AddIcome.propTypes = {
  submitHandler: PropTypes.func,
  cancelHandler: PropTypes.func,
  submitButtonLabel: PropTypes.string,
  openModal: PropTypes.bool,
  openModalHandler: PropTypes.func,
};

export default AddIcome;

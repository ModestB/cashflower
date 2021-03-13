import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { investmentTypeAddRequest, investmentTypeDeleteRequest } from '../../../../store/actions/actions';
import AddDataModal from '../../../../components/dataTable/addDataModal/AddDataModal';
import useChangeTableData from '../../../../shared/hooks/useChangeTableData';

function AddInvestment({
  submitButtonLabel,
  cancelHandler,
  submitHandler,
  openModal,
  openModalHandler,
}) {
  const dispatch = useDispatch();
  const userId = useSelector(state => state.user.userId);
  const investmentTypes = useSelector(state => state.info.types.investment);
  const investmentTypeAddLoading = useSelector(state => state.info.loading.typeAdd);
  const investmentTypeDeleteLoading =
    useSelector(state => state.info.loading.typeDelete);
  const {
    values,
    valuesChangeHandlers,
    saveDataHandler,
    selectItems,
  } = useChangeTableData({
    userId,
    submitHandler,
    types: investmentTypes,
  });

  const addTypeHandler = (uid, investmentType) => {
    dispatch(investmentTypeAddRequest(uid, investmentType));
  };

  const deleteTypeHandler = (key, uid) => {
    dispatch(investmentTypeDeleteRequest(key, uid));
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

import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { investmentTypeAddRequest, investmentTypeDeleteRequest } from '../../../../store/actions/actions';
import EditData from '../../../../components/dataTable/editData/EditData';
import useChangeTableData from '../../../../shared/hooks/useChangeTableData';

function EditInvestment({
  row,
  editHandler,
  cancelHandler,
  submitButtonLabel,
}) {
  const investmentTypes = useSelector(state => state.info.types.investment);
  const investmentTypeAddLoading = useSelector(state => state.info.loading.typeAdd);
  const investmentTypeDeleteLoading = useSelector(state => state.info.loading.typeDelete);
  const dispatch = useDispatch();
  const {
    values,
    valuesChangeHandlers,
    saveDataHandler,
    selectItems,
  } = useChangeTableData({
    row,
    submitHandler: editHandler,
    types: investmentTypes,
  });

  const addTypeHandler = (uid, investmentType) => {
    dispatch(investmentTypeAddRequest(uid, investmentType));
  };

  const deleteTypeHandler = (key, uid) => {
    dispatch(investmentTypeDeleteRequest(key, uid));
  };

  return (
    <EditData
      cancelHandler={cancelHandler}
      submitButtonLabel={submitButtonLabel}
      dataChangeHandlers={valuesChangeHandlers}
      dataValues={values}
      editDataHandler={saveDataHandler}
      addTypeHandler={addTypeHandler}
      deleteTypeHandler={deleteTypeHandler}
      selectOptions={selectItems}
      selectAddLoading={investmentTypeAddLoading}
      selectDeleteLoading={investmentTypeDeleteLoading}
    />
  );
}

EditInvestment.propTypes = {
  row: PropTypes.oneOfType([PropTypes.object]).isRequired,
  editHandler: PropTypes.func.isRequired,
  cancelHandler: PropTypes.func,
  submitButtonLabel: PropTypes.string,
};

EditInvestment.defaultProps = {
  submitButtonLabel: 'Save Investment',
  cancelHandler: () => {},
};

export default EditInvestment;

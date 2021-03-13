import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { incomeTypeAddRequest, incomeTypeDeleteRequest } from '../../../../store/actions/actions';
import EditData from '../../../../components/dataTable/editData/EditData';
import useChangeTableData from '../../../../shared/hooks/useChangeTableData';

function EditIncome({
  row,
  editHandler,
  cancelHandler,
  submitButtonLabel,
}) {
  const incomeTypes = useSelector(state => state.info.types.income);
  const incomeTypeAddLoading = useSelector(state => state.info.loading.typeAdd);
  const incomeTypeDeleteLoading = useSelector(state => state.info.loading.typeDelete);
  const dispatch = useDispatch();
  const {
    values,
    valuesChangeHandlers,
    saveDataHandler,
    selectItems,
  } = useChangeTableData({
    row,
    submitHandler: editHandler,
    types: incomeTypes,
  });

  const addTypeHandler = (uid, incomeType) => {
    dispatch(incomeTypeAddRequest(uid, incomeType));
  };

  const deleteTypeHandler = (key, uid) => {
    dispatch(incomeTypeDeleteRequest(key, uid));
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

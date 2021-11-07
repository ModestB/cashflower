import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { incomeTypeAddRequest, incomeTypeDeleteRequest } from '../../../../store/actions/actions';
import EditData from '../../../../components/dataTable/editData/EditData';

function EditTransaction({
  row,
  editHandler,
  cancelHandler,
  submitButtonLabel,
}) {
  const transactionsCategories = useSelector(state => state.transactions.categories);
  const [date, setDate] = useState(new Date());
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState(Object.values(transactionsCategories)[0]);
  const [comment, setComment] = useState(' ');

  useEffect(() => {
    if (row) {
      if (row.date) setDate(new Date(row.date));
      if (row.amount) setAmount(row.amount);
      if (row.category) {
        setCategory(row.category);
      }
      if (row.comment) setComment(row.comment);
    }
  }, [row]);

  const saveDataHandler = () => {
    const formatedData = {
      date: date.toISOString().split('T')[0],
      amount,
      category: category.id,
      comment,
    };

    editHandler(formatedData, row.id);
  };

  // REFACTOR: Gal nereikia
  const incomeTypes = useSelector(state => state.info.types.income);
  const incomeTypeAddLoading = useSelector(state => state.info.loading.typeAdd);
  const incomeTypeDeleteLoading = useSelector(state => state.info.loading.typeDelete);

  const dispatch = useDispatch();

  const addTypeHandler = (uid, incomeType) => {
    dispatch(incomeTypeAddRequest(uid, incomeType));
  };

  const deleteTypeHandler = (key, uid) => {
    dispatch(incomeTypeDeleteRequest(key, uid));
  };

  const handleCategoryChange = (categoryID) => {
    setCategory(transactionsCategories[categoryID]);
  };

  return (
    <EditData
      cancelHandler={cancelHandler}
      submitButtonLabel={submitButtonLabel}
      editDataHandler={saveDataHandler}
      addTypeHandler={addTypeHandler}
      deleteTypeHandler={deleteTypeHandler}
      selectAddLoading={incomeTypeAddLoading}
      selectDeleteLoading={incomeTypeDeleteLoading}
      types={transactionsCategories}
      values={{
        date,
        amount,
        category,
        comment,
      }}
      valuesChangeHandlers={{
        date: setDate,
        amount: setAmount,
        category: handleCategoryChange,
        comment: setComment,
      }}
      selectOptions={{
        category: transactionsCategories,
      }}
    />
  );
}

EditTransaction.propTypes = {
  row: PropTypes.oneOfType([PropTypes.object]).isRequired,
  editHandler: PropTypes.func.isRequired,
  cancelHandler: PropTypes.func,
  submitButtonLabel: PropTypes.string,
};

EditTransaction.defaultProps = {
  submitButtonLabel: 'Save Income',
  cancelHandler: () => {},
};

export default EditTransaction;

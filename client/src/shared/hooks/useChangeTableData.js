import { useState, useEffect } from 'react';

const useChangeTableData = ({
  userId,
  types,
  submitHandler,
  row = {},
}) => {
  const [date, setDate] = useState(new Date());
  const [amount, setAmount] = useState('');
  const [type, setType] = useState(Object.keys(types)[0]);
  const [comment, setComment] = useState(' ');

  useEffect(() => {
    if (row) {
      if (row.date) setDate(new Date(row.date));
      if (row.amount) setAmount(row.amount);
      if (row.type) {
        setType(row.type.toLowerCase());
      }
      if (row.comment) setComment(row.comment);
    }
  }, [row]);

  const saveDataHandler = () => {
    const formatedData = {
      date: date.toISOString().split('T')[0],
      amount,
      type,
      comment,
    };

    if (!Object.values(row)) {
      // Add new Data
      submitHandler(formatedData, userId);
    } else {
      // Edit Data
      submitHandler(formatedData, row.id);
    }
  };

  return {
    values: {
      date,
      amount,
      type,
      comment,
    },
    valuesChangeHandlers: {
      date: setDate,
      amount: setAmount,
      type: setType,
      comment: setComment,
    },
    selectItems: {
      type: types,
    },
    saveDataHandler,
  };
};

export default useChangeTableData;

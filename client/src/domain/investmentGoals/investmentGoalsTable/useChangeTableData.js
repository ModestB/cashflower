import { useState, useEffect } from 'react';

const useChangeTableData = ({
  userId,
  types,
  submitHandler,
  row = {},
}) => {
  const [type, setType] = useState(Object.keys(types)[0]);
  const [year, setYear] = useState(new Date());
  const [goal, setGoal] = useState('');

  useEffect(() => {
    if (row) {
      if (row.year) setYear(new Date(`${row.year}-01-01`));
      if (row.goal) setGoal(row.goal);
      if (row.type) {
        setType(row.type.toLowerCase());
      }
    }
  }, [row]);

  const saveDataHandler = () => {
    const formatedData = {
      year: year.toISOString().split('T')[0],
      goal,
      type,
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
      year,
      goal,
      type,
    },
    valuesChangeHandlers: {
      year: setYear,
      goal: setGoal,
      type: setType,
    },
    selectItems: {
      type: types,
    },
    saveDataHandler,
  };
};

export default useChangeTableData;

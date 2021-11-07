import React, { useState } from 'react';
import PropTypes from 'prop-types';

const TableEditHandlersContext = React.createContext({
  tableSettings: {},
  setTableSettings: () => {},
});

const TableEditHandlersProvider = ({ children }) => {
  const [tableSettings, setTableSettings] = useState({ });
  return (
    <TableEditHandlersContext.Provider value={{ tableSettings, setTableSettings }}>
      {children}
    </TableEditHandlersContext.Provider>
  );
};

TableEditHandlersProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export { TableEditHandlersContext, TableEditHandlersProvider };

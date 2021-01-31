import React, { useState } from 'react';
import PropTypes from 'prop-types';

const TableSettingsContext = React.createContext({ tableSettings: {}, setTableSettings: () => {} });

const TableSettingsProvider = ({ children }) => {
  const [tableSettings, setTableSettings] = useState({ });
  return (
    <TableSettingsContext.Provider value={{ tableSettings, setTableSettings }}>
      {children}
    </TableSettingsContext.Provider>
  );
};

TableSettingsProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export { TableSettingsContext, TableSettingsProvider };

import React, { useState } from 'react';
import PropTypes from 'prop-types';

const LoadingContext = React.createContext({ loading: false, setLoading: () => {} });

const LoadingContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

LoadingContextProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export { LoadingContext, LoadingContextProvider };

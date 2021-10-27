import React from 'react';
import { useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Material from '../../../shared/material';
import StyledButton from '../../buttons/StyledButton';

const useStyles = makeStyles(() => ({
  buttonAdd: {
    fontWeight: '700',
  },
}));

function HeaderAddButton({
  clickHandler,
}) {
  const location = useLocation();
  const classes = useStyles();
  let button = null;
  switch (location.pathname) {
    case '/':
      button = (
        <Material.Box py={2} pr={2}>
          <StyledButton
            variant="contained"
            color="success"
            className={classes.buttonAdd}
            onClick={() => clickHandler(true)}
          >
            Add Transaction
          </StyledButton>
        </Material.Box>
      );
      break;

    default:
      break;
  }
  return button;
}

export default HeaderAddButton;

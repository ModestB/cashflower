import React from 'react';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import theme from '../../theme';
import { withStyles} from '@material-ui/core/styles';

// Like https://github.com/brunobertolini/styled-by
const styledBy = (property, mapping) => (props) => mapping[props[property]];

const styles = {
  root: {
    backgroundColor: styledBy('color', {
      success: theme.palette.success.main,
      danger: theme.palette.danger.main,
    }),
    color: styledBy('color', {
      success: theme.palette.success.contrastText,
      danger: theme.palette.danger.contrastText,
    }),
    '&:hover': {
      backgroundColor: styledBy('color', {
        success: theme.palette.success.dark,
        danger: theme.palette.danger.dark,
      })
    },
  },
};

const StyledButton = withStyles(styles)(({ classes, children, className, color, ...other } ) => {
  return (
    <Button className={clsx(classes.root, className)} {...other} >
      {children || 'class names'}
    </Button>
  );
})

export default StyledButton;
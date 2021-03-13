import React from 'react';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import { withStyles, fade } from '@material-ui/core/styles';
import theme from '../../themes/defaultTheme';

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
      }),
    },
    '&.Mui-disabled': {
      backgroundColor: styledBy('color', {
        success: fade(theme.palette.success.main, 0.8),
        danger: fade(theme.palette.danger.main, 0.8),
      }),
      color: styledBy('color', {
        success: fade(theme.palette.success.contrastText, 0.8),
        danger: fade(theme.palette.danger.contrastText, 0.8),
      }),
    },
  },
  outlined: {
    backgroundColor: styledBy('color', {
      success: 'transparent',
      danger: 'transparent',
    }),
    color: styledBy('color', {
      success: theme.palette.success.main,
      danger: theme.palette.danger.main,
    }),
    fill: styledBy('color', {
      success: theme.palette.success.main,
      danger: theme.palette.danger.main,
    }),
    borderColor: styledBy('color', {
      success: fade(theme.palette.success.main, 0.5),
      danger: fade(theme.palette.danger.main, 0.5),
    }),
    '&:hover': {
      backgroundColor: styledBy('color', {
        success: fade(theme.palette.success.main, 0.04),
        danger: fade(theme.palette.danger.main, 0.04),
      }),
    },
  },
};

const StyledButton = withStyles(styles)(({
  classes, children, className, color, ...other
}) => {
  let clsxName = classes.root;
  if (other.variant === 'outlined') {
    clsxName = classes.outlined;
  }
  return (
    <Button
      className={clsx(clsxName, className)}
      {...other}
    >
      {children || 'class names'}
    </Button>
  );
});

export default StyledButton;

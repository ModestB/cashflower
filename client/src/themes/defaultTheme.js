import { createMuiTheme } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import indigo from '@material-ui/core/colors/indigo';

const palette = {
  primary: {
    main: indigo[500],
  },
  success: {
    main: green[500],
    contrastText: grey[50],
  },
  danger: {
    main: red[500],
    dark: red[700],
    contrastText: grey[50],
  },
};

const defaultSpacing = 8;
const spacing = factor => `${defaultSpacing * factor}`; // (Bootstrap strategy)
const themeMixins = {
  customScrollBar: {
    '&::-webkit-scrollbar': {
      width: 5,
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: grey[300],
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: grey[400],
    },
    '&:hover': {
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: grey[500],
      },
    },
    scrollbarWidth: 'thin',
    scrollBehavior: 'smooth',
  },
  formColumn: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    '& .MuiFormControl-root, .MuiBox-root ': {
      margin: `${spacing(1)}px 0 ${spacing(1)}px 0`,
    },
  },
};
const themeOverrides = {
  MuiSelect: {
    select: {
      '&:focus': {
        backgroundColor: 'transparent',
      },
    },
  },
  MuiOutlinedInput: {
    root: {
      color: palette.primary.main,
      '&:hover $notchedOutline': {
        borderColor: palette.primary.main,
      },
    },
    input: {
      padding: '11px 14px',
    },
    notchedOutline: {
      borderColor: palette.primary.main,
    },
  },
  MuiInputLabel: {
    outlined: {
      transform: 'translate(11px, 14px) scale(1)',
      color: palette.primary.main,
      '&.Mui-focused': {
        color: palette.primary.main,
      },
    },
  },
};

const theme = createMuiTheme({
  palette,
  spacing: defaultSpacing,
  mixins: themeMixins,
  overrides: themeOverrides,
  drawerWidth: 250,
});

export default theme;

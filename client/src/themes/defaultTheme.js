import { createMuiTheme } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import red from '@material-ui/core/colors/red';

const palette = {
  primary: {
    main: '#3E92CC',
    dark: '#12263A',
  },
  success: {
    main: '#04C842',
    contrastText: grey[50],
  },
  danger: {
    main: red[500],
    dark: red[700],
    contrastText: grey[50],
  },
  text: {
    muted: '#707070',
  },
  background: {
    light: '#FAFBFC',
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
  MuiAlertTitle: {
    root: {
      fontWeight: 700,
    },
  },
  MuiListItemIcon: {
    root: {
      minWidth: 'initial',
    },
  },
  MuiAppBar: {
    colorPrimary: {
      backgroundColor: palette.background.light,
      color: palette.primary.dark,
    },
  },
  MuiButton: {
    root: {
      borderRadius: '8px',
      padding: '6px 30px',
    },
  },
};

const theme = createMuiTheme({
  palette,
  spacing: defaultSpacing,
  mixins: themeMixins,
  overrides: themeOverrides,
  drawerWidth: 100,
});

export default theme;

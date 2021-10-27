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
    light: red[300],
    main: red[500],
    dark: red[700],
    contrastText: grey[50],
  },
  text: {
    muted: '#707070',
  },
  background: {
    light: '#FAFBFC',
    grey: '#C9C7C7',
  },
};
const toolbarHeightDesktop = 64;
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
  toolbar: {
    minHeight: 56,
    '@media (min-width:0px) and (orientation: landscape)': {
      minHeight: 48,
    },
    '@media (min-width:600px)': {
      minHeight: toolbarHeightDesktop,
      height: toolbarHeightDesktop,
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
      color: palette.primary.dark,
      '&:hover $notchedOutline': {
        borderColor: palette.primary.dark,
      },
      '&.Mui-focused $notchedOutline': {
        borderColor: palette.primary.dark,
      },
    },
    input: {
      padding: '11px 14px',
    },
    notchedOutline: {
      borderColor: palette.primary.dark,
    },
  },
  MuiInputLabel: {
    outlined: {
      transform: 'translate(11px, 14px) scale(1)',
      color: palette.primary.dark,
      '&.Mui-focused': {
        color: palette.primary.dark,
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
  drawerWidth: 120,
  toolbarHeight: {
    desktop: toolbarHeightDesktop,
  },
});

export default theme;

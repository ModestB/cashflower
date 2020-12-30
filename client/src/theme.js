import { createMuiTheme } from "@material-ui/core/styles";
import grey from "@material-ui/core/colors/grey";
import green from "@material-ui/core/colors/green";
import red from "@material-ui/core/colors/red";

const theme = createMuiTheme({
  palette: {
    success: {
      main: green[500],
      contrastText: grey[50] 
    },
    danger: {
      main: red[500],
      dark: red[700],
      contrastText: grey[50] 
    }
  },
  mixins: {
    customScrollBar: {
      "&::-webkit-scrollbar": {
        width: 5,
      },
      "&::-webkit-scrollbar-track": {
        backgroundColor: grey[300],
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: grey[400],
      },
      "&:hover": {
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: grey[500],
        },
      },
      scrollbarWidth: "thin",
      scrollbarColor: `${grey[400]} ${grey[300]}`,
      scrollBehavior: "smooth",
    },
  },
  overrides: {
    MuiSelect: {
      select: {
        "&:focus": {
          backgroundColor: "transparent",
        },
      },
    },
  },
});

export default theme;

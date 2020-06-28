import { createMuiTheme } from "@material-ui/core/styles";
import grey from "@material-ui/core/colors/grey";

const theme = createMuiTheme({
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

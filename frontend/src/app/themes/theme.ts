import { createTheme } from "@mui/material/styles";
import { grey } from "@mui/material/colors";

export const tabIconTheme = createTheme({
  palette: {
    primary: {
      main: grey[50],
    },
  },
  components: {
    MuiTab: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            color: grey[50],
          },
          "&.MuiTab-textColorPrimary:not(.Mui-selected)": {
            color: grey[600],
          },
        },
      },
    },
  },
});

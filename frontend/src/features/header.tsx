"use client";
import { AppBar, Box, Toolbar, Typography, ThemeProvider } from "@mui/material";
import { wholeTheme } from "./themes/theme";

export function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <ThemeProvider theme={wholeTheme}>
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              UECS Navi Creator
            </Typography>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </Box>
  );
}

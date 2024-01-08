"use client";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { ThemeProvider, IconButton } from "@mui/material";
import { wholeTheme } from "@/features/themes/theme";
import { styled } from "@mui/system";

const LargeIconButton = styled(IconButton)({
  fontSize: "80px",
});

const LargeAddCircleIcon = styled(AddCircleIcon)({
  fontSize: "80px",
});

export function AddDeviceButton() {
  return (
    <ThemeProvider theme={wholeTheme}>
      <LargeIconButton color="primary">
        <LargeAddCircleIcon />
      </LargeIconButton>
    </ThemeProvider>
  );
}

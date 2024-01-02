import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { Box, TextField } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material";

interface ParamListItemProps {
  name: string;
  unit: string;
}

const FlexWrapper = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export default function ParamListItem(props: ParamListItemProps) {
  const { name, unit } = props;

  return (
    <Box sx={{ display: "flex" }}>
      <FlexWrapper>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker />
        </LocalizationProvider>
        <div>〜</div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker />
        </LocalizationProvider>
      </FlexWrapper>
      <FlexWrapper>
        <div>{name}</div>
        <TextField type="number" />
        <div>{unit}</div>
      </FlexWrapper>
      <IconButton aria-label="close">
        <CloseIcon />
      </IconButton>
    </Box>
  );
}

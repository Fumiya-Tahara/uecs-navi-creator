import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { Box, TextField } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material";

interface ReceptionParamProps {
  name: string;
  unit: string;
}

const FlexWrapper = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export default function ReceptionParam(props: ReceptionParamProps) {
  const { name, unit } = props;

  return (
    <Box
      sx={{ width: "100%", display: "flex", justifyContent: "space-between" }}
    >
      <Box>
        <FlexWrapper>
          <FlexWrapper>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker />
            </LocalizationProvider>
            <Box>〜</Box>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker />
            </LocalizationProvider>
          </FlexWrapper>
          <FlexWrapper sx={{ marginX: "30px" }}>
            <Box>{name}</Box>
            <TextField type="number" />
            <Box>{unit}</Box>
          </FlexWrapper>
        </FlexWrapper>
      </Box>
      <IconButton aria-label="close">
        <CloseIcon />
      </IconButton>
    </Box>
  );
}

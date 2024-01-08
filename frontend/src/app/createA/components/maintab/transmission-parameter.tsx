import { Box, TextField } from "@mui/material";

interface TransmissionParamProps {
  param: string;
  unit: string;
}

export function TransmissionParam(props: TransmissionParamProps) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box>{props.param}</Box>
      <TextField type="number" />
      <Box>{props.unit}</Box>
    </Box>
  );
}

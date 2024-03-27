import { Box } from "@mui/material";
import { ReceptionParams } from "./components/block-b";

export default function ListCreate() {
  return (
    <Box sx={{ paddingY: "48px", display: "flex", justifyContent: "center" }}>
      <ReceptionParams />
    </Box>
  );
}

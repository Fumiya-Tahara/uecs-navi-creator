"use client";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {
  ThemeProvider,
  IconButton,
  Modal,
  Box,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  MenuItem,
} from "@mui/material";
import { wholeTheme } from "@/features/themes/theme";
import { styled } from "@mui/system";
import { useState } from "react";
import { Sensor } from "../../interfaces/interfaces";

interface AddSensorButtonProps {
  sensorList: Sensor[];
  selectedSensor: Sensor[];
  setSelectedSensor: React.Dispatch<React.SetStateAction<Sensor[]>>;
}

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const LargeIconButton = styled(IconButton)({
  fontSize: "80px",
});

const LargeAddCircleIcon = styled(AddCircleIcon)({
  fontSize: "80px",
});

export function AddSensorButton(props: AddSensorButtonProps) {
  const { sensorList, selectedSensor, setSelectedSensor } = props;

  const [open, setOpen] = useState(false);
  const [selectBoxValue, setSelectBoxValue] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChange = (event: SelectChangeEvent) => {
    setSelectBoxValue(event.target.value as string);
  };
  const handleClick = () => {
    const intSensorId: number = parseInt(selectBoxValue);
    const selectboxSensor: Sensor | undefined = sensorList.find(
      (sensor) => sensor.id === intSensorId
    );
    if (!selectboxSensor) {
      return;
    }
    if (
      selectedSensor.some((eachSensor) => eachSensor.id === selectboxSensor.id)
    ) {
      return;
    } else {
      setSelectedSensor((preSelectedSensor) => [
        ...preSelectedSensor,
        selectboxSensor,
      ]);
      setSelectBoxValue("");
      setOpen(false);
    }
  };

  return (
    <div>
      <ThemeProvider theme={wholeTheme}>
        <LargeIconButton
          onClick={handleOpen}
          color="primary"
          sx={{ position: "absolute", bottom: "100px", right: "100px" }}
        >
          <LargeAddCircleIcon />
        </LargeIconButton>
      </ThemeProvider>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  センサーを選択してください
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectBoxValue}
                  label="センサーを選択してください"
                  onChange={handleChange}
                >
                  {sensorList.map((sensor, index) => (
                    <MenuItem key={index} value={sensor.id}>
                      {sensor.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "right",
                  marginTop: "5px",
                }}
              >
                <Button variant="contained" size="small" onClick={handleClick}>
                  追加する
                </Button>
              </Box>
            </Box>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

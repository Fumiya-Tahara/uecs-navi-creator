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
import { Device } from "../interfaces/interfaces";

interface AddDeviceButtonProps {
  deviceList: Device[];
  selectedDevice: Device[];
  setSelectedDevice: React.Dispatch<React.SetStateAction<Device[]>>;
}

const modalStyle = {
  position: "absolute" as "absolute",
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

export function AddDeviceButton(props: AddDeviceButtonProps) {
  const { deviceList, selectedDevice, setSelectedDevice } = props;

  const [open, setOpen] = useState(false);
  const [selectBoxValue, setSelectBoxValue] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChange = (event: SelectChangeEvent) => {
    setSelectBoxValue(event.target.value as string);
  };
  const handleClick = () => {
    console.log(selectBoxValue);
    const intDeviceId: number = parseInt(selectBoxValue);
    const selectboxDevice: Device | undefined = deviceList.find(
      (device) => device.id === intDeviceId
    );
    if (!selectboxDevice) {
      return;
    }
    if (
      selectedDevice.some((eachDevice) => eachDevice.id === selectboxDevice.id)
    ) {
      return;
    } else {
      setSelectedDevice((preSelectedDevice) => [
        ...preSelectedDevice,
        selectboxDevice,
      ]);
    }
  };

  return (
    <div>
      <ThemeProvider theme={wholeTheme}>
        <LargeIconButton onClick={handleOpen} color="primary">
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
                  デバイスを選択してください
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectBoxValue}
                  label="デバイスを選択してください"
                  onChange={handleChange}
                >
                  {deviceList.map((device, index) => (
                    <MenuItem key={index} value={device.id}>
                      {device.name}
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

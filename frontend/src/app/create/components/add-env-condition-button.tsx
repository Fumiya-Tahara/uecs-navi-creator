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
import { EnvCondition } from "../interfaces/interfaces";

interface AddEnvConditionButtonProps {
  envConditionList: EnvCondition[];
  selectedEnvCondition: EnvCondition[];
  setSelectedEnvCondition: React.Dispatch<React.SetStateAction<EnvCondition[]>>;
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

export function AddEnvConditionButton(props: AddEnvConditionButtonProps) {
  const { envConditionList, selectedEnvCondition, setSelectedEnvCondition } =
    props;

  const [open, setOpen] = useState(false);
  const [selectBoxValue, setSelectBoxValue] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChange = (event: SelectChangeEvent) => {
    setSelectBoxValue(event.target.value as string);
  };
  const handleClick = () => {
    const intEnvConditionId: number = parseInt(selectBoxValue);
    const selectboxEnvCondition: EnvCondition | undefined =
      envConditionList.find(
        (envCondition) => envCondition.id === intEnvConditionId
      );
    if (!selectboxEnvCondition) {
      return;
    }
    if (
      selectedEnvCondition.some(
        (eachEnvCondition) => eachEnvCondition.id === selectboxEnvCondition.id
      )
    ) {
      return;
    } else {
      setSelectedEnvCondition((preSelectedEnvCondition) => [
        ...preSelectedEnvCondition,
        selectboxEnvCondition,
      ]);
      setSelectBoxValue("");
      setOpen(false);
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
                  環境条件を選択してください
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectBoxValue}
                  label="環境条件を選択してください"
                  onChange={handleChange}
                >
                  {envConditionList.map((envCondition, index) => (
                    <MenuItem key={index} value={envCondition.id}>
                      {envCondition.name}
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

"use client";
import {
  List,
  ListItem,
  Tab,
  Tabs,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { tabIconTheme } from "@/app/themes/theme";
import { TransmissionParam } from "./transmission-parameter";
import { ReceptionParam } from "./reception-parameter";
import { styled } from "@mui/material";
import { Device } from "../../interfaces/interfaces";

const CustomButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
}));

interface SelectedDevicesTabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface InputParamsTabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface MainTabProps {
  deviceList: Device[];
  sensorList: ParamListItemProps[];
  selectedDeviceIndex: number[];
  setSelectedDeviceIndex: React.Dispatch<React.SetStateAction<number[]>>;
}

interface ParamListItemProps {
  name: string;
  unit: string;
}

const SelectedDevicesTabPanel = (props: SelectedDevicesTabPanelProps) => {
  const { children, value, index } = props;
  return <div hidden={value !== index}>{value == index ? children : null}</div>;
};

const InputParamsTabPanel = (props: InputParamsTabPanelProps) => {
  const { children, value, index } = props;
  return <div hidden={value !== index}>{value == index ? children : null}</div>;
};

export default function MainTabs(props: MainTabProps) {
  const {
    deviceList,
    sensorList,
    selectedDeviceIndex,
    setSelectedDeviceIndex,
  } = props;
  const [value, setValue] = useState(0);
  let devicesInPanel: string[] = [];
  let paramsInPanel: ParamListItemProps[] = [
    { name: "気温", unit: "度" },
    { name: "湿度", unit: "%" },
  ];

  if (selectedDeviceIndex != undefined) {
    for (let i = 0; i < selectedDeviceIndex.length; i++) {
      devicesInPanel.push(deviceList[selectedDeviceIndex[i]].name);
    }
  }

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleDeleteDevice = (deviceName: string) => {
    const newSelectedDeviceIndex: number[] = selectedDeviceIndex.filter(
      (selectedDevice) => deviceList[selectedDevice].name != deviceName
    );
    setSelectedDeviceIndex(newSelectedDeviceIndex);
  };

  return (
    <div style={{ width: "85%" }}>
      <div
        style={{
          width: "100%",
          aspectRatio: "8/5",
          border: "solid",
          backgroundColor: grey[200],
          borderColor: grey[700],
        }}
      >
        <ThemeProvider theme={tabIconTheme}>
          <Tabs
            value={value}
            variant="scrollable"
            textColor="primary"
            indicatorColor="primary"
            onChange={handleTabChange}
            sx={{ backgroundColor: grey[900] }}
          >
            <Tab value={0} label="選択デバイス" />
            {devicesInPanel.map((device, index) => {
              return <Tab key={index} value={index + 1} label={device} />;
            })}
          </Tabs>
        </ThemeProvider>
        <div>
          <SelectedDevicesTabPanel value={value} index={0}>
            <List>
              {devicesInPanel.map((deviceName, index) => {
                return (
                  <ListItem key={index}>
                    <div style={{ width: "70%" }}>{deviceName}</div>
                    <Button
                      variant="outlined"
                      size="small"
                      sx={{ width: "15%" }}
                      onClick={() => setValue(index + 1)}
                    >
                      パラメータ設定
                    </Button>
                    <div
                      style={{
                        width: "15%",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <IconButton aria-label="close">
                        <CloseIcon />
                      </IconButton>
                    </div>
                  </ListItem>
                );
              })}
            </List>
          </SelectedDevicesTabPanel>
          {devicesInPanel.map((device, index) => {
            return (
              <InputParamsTabPanel key={index} value={value} index={index + 1}>
                <Box sx={{ padding: "8px 16px" }}>
                  <Box sx={{ fontWeight: "bold" }}>送信パラメータ</Box>
                  <TransmissionParam param="気温" unit="度"></TransmissionParam>
                </Box>
                <Box sx={{ paddingY: "8px", marginTop: "30px" }}>
                  <Box sx={{ paddingX: "16px", fontWeight: "bold" }}>
                    受信パラメータ
                  </Box>
                  <List>
                    {paramsInPanel.map((param, index) => {
                      return (
                        <ListItem key={index}>
                          <ReceptionParam name={param.name} unit={param.unit} />
                        </ListItem>
                      );
                    })}
                  </List>
                </Box>
              </InputParamsTabPanel>
            );
          })}
        </div>
      </div>
      <Box
        sx={{ display: "flex", justifyContent: "flex-end", marginTop: "5px" }}
      >
        <Button variant="contained">保存する</Button>
      </Box>
    </div>
  );
}

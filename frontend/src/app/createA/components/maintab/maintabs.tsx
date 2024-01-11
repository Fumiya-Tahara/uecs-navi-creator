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
import { tabIconTheme } from "@/features/themes/theme";
import { Device, Sensor } from "../../interfaces/interfaces";
import { InputParamsTabPanelContent } from "./input-params-tab-panel-content";

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
  selectedDevice: Device[];
  setSelectedDevice: React.Dispatch<React.SetStateAction<Device[]>>;
  selectedSensor: Map<string, Sensor[]>;
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
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
  const { selectedDevice, setSelectedDevice, selectedSensor, value, setValue } =
    props;

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleDeleteDevice = (deviceName: string) => {
    const newSelectedDevice: Device[] = selectedDevice.filter(
      (selectedDevice) => selectedDevice.name != deviceName
    );
    setSelectedDevice(newSelectedDevice);
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
            {selectedDevice.map((deviceData, index) => {
              return (
                <Tab key={index} value={index + 1} label={deviceData.name} />
              );
            })}
          </Tabs>
        </ThemeProvider>
        <div>
          <SelectedDevicesTabPanel value={value} index={0}>
            <List>
              {selectedDevice.map((deviceData, index) => {
                return (
                  <ListItem key={index}>
                    <div style={{ width: "70%" }}>{deviceData.name}</div>
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
                      <IconButton
                        aria-label="close"
                        onClick={() => handleDeleteDevice(deviceData.name)}
                      >
                        <CloseIcon />
                      </IconButton>
                    </div>
                  </ListItem>
                );
              })}
            </List>
          </SelectedDevicesTabPanel>
          {selectedDevice.map((deviceData, index) => {
            return (
              <InputParamsTabPanel key={index} value={value} index={index + 1}>
                <InputParamsTabPanelContent
                  deviceData={deviceData}
                  sensorDataList={selectedSensor.get(deviceData.name) || []}
                />
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

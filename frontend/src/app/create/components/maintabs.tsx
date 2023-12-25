"use client";
import { List, ListItem, Tab, Tabs, Button } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { tabIconTheme } from "@/app/themes/theme";

interface MainTabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface MainTabProps {
  deviceList: string[];
  sensorList: string[];
  selectedDeviceIndex: number[];
  setSelectedDeviceIndex: React.Dispatch<React.SetStateAction<number[]>>;
}

const MainTabPanel = (props: MainTabPanelProps) => {
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
  let deviceInPanel: string[] = [];

  if (selectedDeviceIndex != undefined) {
    for (let i = 0; i < selectedDeviceIndex.length; i++) {
      deviceInPanel.push(deviceList[selectedDeviceIndex[i]]);
    }
  }

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleDeleteDevice = (deviceName: string) => {
    const newSelectedDeviceIndex: number[] = selectedDeviceIndex.filter(
      (selectedDevice) => deviceList[selectedDevice] != deviceName
    );
    setSelectedDeviceIndex(newSelectedDeviceIndex);
  };

  return (
    <div
      className="maintabs"
      style={{
        width: "80%",
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
          {deviceInPanel.map((device, index) => {
            return <Tab key={index} value={index + 1} label={device} />;
          })}
        </Tabs>
      </ThemeProvider>
      <div>
        <MainTabPanel value={value} index={0}>
          <List>
            {deviceInPanel.map((deviceName, index) => {
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
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      onClick={() => handleDeleteDevice(deviceName)}
                    >
                      <CloseIcon color="error" />
                    </Button>
                  </div>
                </ListItem>
              );
            })}
          </List>
        </MainTabPanel>
        {deviceInPanel.map((device, index) => {
          return (
            <MainTabPanel key={index} value={value} index={index + 1}>
              <List>
                <ListItem></ListItem>
              </List>
            </MainTabPanel>
          );
        })}
        <MainTabPanel value={value} index={1}>
          <List>
            <ListItem></ListItem>
          </List>
        </MainTabPanel>
      </div>
    </div>
  );
}

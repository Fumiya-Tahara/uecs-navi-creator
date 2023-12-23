"use client";
// import "../styles/maintabs.css";
import { List, ListItem, Tab, Tabs } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
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
  selectedDevice: number[];
  setSelectedDevice: React.Dispatch<React.SetStateAction<number[]>>;
}

const MainTabPanel = (props: MainTabPanelProps) => {
  const { children, value, index } = props;
  return <div hidden={value !== index}>{value == index ? children : null}</div>;
};

export default function MainTabs(props: MainTabProps) {
  const { deviceList, sensorList, selectedDevice, setSelectedDevice } = props;
  const [value, setValue] = useState(0);
  let deviceInPanel: string[] = [];

  if (selectedDevice != undefined) {
    for (let i = 0; i < selectedDevice.length; i++) {
      deviceInPanel.push(deviceList[selectedDevice[i]]);
    }
  }

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
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
          onChange={handleChange}
          sx={{ backgroundColor: grey[900] }}
        >
          <Tab value={0} label="選択デバイス" />
          <Tab value={1} label="加温機" />
        </Tabs>
      </ThemeProvider>
      <div>
        <MainTabPanel value={value} index={0}>
          <List>
            {deviceInPanel.map((devicename, index) => {
              return (
                <ListItem key={index}>
                  <div>{devicename}</div>
                </ListItem>
              );
            })}
          </List>
        </MainTabPanel>
        <MainTabPanel value={value} index={1}>
          <List>
            <ListItem>
              <div>Sensor</div>
            </ListItem>
          </List>
        </MainTabPanel>
      </div>
    </div>
  );
}

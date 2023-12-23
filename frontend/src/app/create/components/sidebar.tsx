"use client";
import { List, ListItem, Tab, Tabs, Box } from "@mui/material";
import DevicesIcon from "@mui/icons-material/Devices";
import SensorsIcon from "@mui/icons-material/Sensors";
import { DeviceCard } from "./device-card";
import { grey } from "@mui/material/colors";
import { useState } from "react";
import { tabIconTheme } from "@/app/themes/theme";
import { ThemeProvider } from "@mui/material/styles";
interface SidebarTabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface SidebarProps {
  deviceList: string[];
  sensorList: string[];
}

const SidebarTabPanel = (props: SidebarTabPanelProps) => {
  const { children, value, index } = props;

  return <div hidden={value !== index}>{value == index ? children : null}</div>;
};

export default function Sidebar(props: SidebarProps) {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div style={{ width: "20%", height: "100%" }}>
      <ThemeProvider theme={tabIconTheme}>
        <Tabs
          value={value}
          sx={{ backgroundColor: grey[900], height: "10%" }}
          textColor="primary"
          indicatorColor="primary"
          onChange={handleChange}
        >
          <Tab value={0} icon={<DevicesIcon />} label="DEVICES" />
          <Tab value={1} icon={<SensorsIcon />} label="SENSOR" />
        </Tabs>
      </ThemeProvider>
      <div style={{ backgroundColor: grey[200], height: "90%" }}>
        <SidebarTabPanel value={value} index={0}>
          <List
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {props.deviceList.map((deviceName) => (
              <ListItem key={deviceName} sx={{ width: "80%" }}>
                <DeviceCard deviceName={deviceName} />
              </ListItem>
            ))}
          </List>
        </SidebarTabPanel>
        <SidebarTabPanel value={value} index={1}>
          <List
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {props.sensorList.map((sensorName) => (
              <ListItem key={sensorName} sx={{ width: "80%" }}>
                <DeviceCard deviceName={sensorName} />
              </ListItem>
            ))}
          </List>
        </SidebarTabPanel>
      </div>
    </div>
  );
}

"use client";
import { List, ListItem, Tab, Tabs, colors } from "@mui/material";
import DevicesIcon from "@mui/icons-material/Devices";
import SensorsIcon from "@mui/icons-material/Sensors";
import { DeviceCard } from "./device-card";
import { grey } from "@mui/material/colors";
import { useState } from "react";
import { tabIconTheme } from "@/app/themes/theme";
import { ThemeProvider } from "@mui/material/styles";
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface SidebarProps {
  deviceList: string[];
  sensorList: string[];
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index } = props;

  return <div hidden={value !== index}>{value == index ? children : null}</div>;
}

export function Sidebar(props: SidebarProps) {
  const [value, setValue] = useState(0);
  console.log(value);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className="w-1/5 h-full">
      <ThemeProvider theme={tabIconTheme}>
        <Tabs
          value={value}
          sx={{ backgroundColor: grey[900] }}
          textColor="primary"
          indicatorColor="primary"
          onChange={handleChange}
        >
          <Tab value={0} icon={<DevicesIcon />} label="DEVICES" />
          <Tab value={1} icon={<SensorsIcon />} label="SENSOR" />
        </Tabs>
      </ThemeProvider>
      <div className="bg-gray-50 h-full">
        <TabPanel value={value} index={0}>
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
        </TabPanel>
        <TabPanel value={value} index={1}>
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
        </TabPanel>
      </div>
      {/* <div className="bg-gray-50 h-full">
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
      </div> */}
    </div>
  );
}

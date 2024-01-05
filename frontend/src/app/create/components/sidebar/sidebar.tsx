"use client";
import { List, ListItem, Tab, Tabs, Box } from "@mui/material";
import DevicesIcon from "@mui/icons-material/Devices";
import SensorsIcon from "@mui/icons-material/Sensors";
import { DeviceCard } from "./device-card";
import { grey } from "@mui/material/colors";
import { useState } from "react";
import { tabIconTheme } from "@/app/themes/theme";
import { ThemeProvider } from "@mui/material/styles";
import { Device, Sensor } from "../../interfaces/interfaces";

interface SidebarTabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface SidebarProps {
  deviceList: Device[];
  sensorList: Sensor[];
  selectedDevice: Device[];
  setSelectedDevice: React.Dispatch<React.SetStateAction<Device[]>>;
  selectedSensor: Map<string, Sensor[]>;
  setSelectedSensor: React.Dispatch<
    React.SetStateAction<Map<string, Sensor[]>>
  >;
  maintabValue: number;
}

const SidebarTabPanel = (props: SidebarTabPanelProps) => {
  const { children, value, index } = props;

  return <div hidden={value !== index}>{value == index ? children : null}</div>;
};

export default function Sidebar(props: SidebarProps) {
  const {
    deviceList,
    sensorList,
    selectedDevice,
    setSelectedDevice,
    selectedSensor,
    setSelectedSensor,
    maintabValue,
  } = props;

  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleDeviceClick = (device: Device) => {
    if (selectedDevice.some((eachDevice) => eachDevice.name === device.name)) {
      return;
    } else {
      setSelectedDevice((preSelectedDevice) => [...preSelectedDevice, device]);
    }
  };

  const handleSensorClick = (sensor: Sensor) => {
    // The indices of value and selectedDevice are off by 1
    if (maintabValue == 0) {
      return;
    }

    const deviceName: string = selectedDevice[maintabValue - 1].name;
    if (selectedSensor.has(deviceName)) {
      if (
        selectedSensor
          .get(deviceName)!
          .some((eachSensor) => eachSensor.name === sensor.name)
      ) {
        return;
      }
      setSelectedSensor((preSelectedSensor) => {
        const newSelectedSensor = new Map(preSelectedSensor);
        newSelectedSensor.set(deviceName, [
          ...newSelectedSensor.get(deviceName)!,
          sensor,
        ]);
        return newSelectedSensor;
      });
    } else {
      setSelectedSensor((preSelectedSensor) => {
        const newSelectedSensor = new Map(preSelectedSensor);
        newSelectedSensor.set(deviceName, [sensor]);
        return newSelectedSensor;
      });
    }
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
          <Tab value={0} icon={<DevicesIcon />} label="デバイス" />
          <Tab value={1} icon={<SensorsIcon />} label="センサー" />
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
            {deviceList.map((device, index) => (
              <ListItem
                key={index}
                sx={{ width: "80%" }}
                onClick={() => handleDeviceClick(device)}
              >
                <DeviceCard deviceName={device.name} />
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
            {sensorList.map((sensor, index) => (
              <ListItem
                key={index}
                sx={{ width: "80%" }}
                onClick={() => handleSensorClick(sensor)}
              >
                <DeviceCard deviceName={sensor.name} />
              </ListItem>
            ))}
          </List>
        </SidebarTabPanel>
      </div>
    </div>
  );
}

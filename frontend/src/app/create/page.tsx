"use client";
import { getDeviceList, getSensorList } from "../../../stub/create-func";
import { Box } from "@mui/material";
import Sidebar from "./components/sidebar/sidebar";
import MainTabs from "./components/maintab/maintabs";
import { useState } from "react";
import { Device, Sensor } from "./interfaces/interfaces";

function Create() {
  const [selectedDevice, setSelectedDevice] = useState<Device[]>([]);
  const [selectedSensor, setSelectedSensor] = useState<Map<string, Sensor[]>>(
    new Map<string, Sensor[]>()
  );
  const [mailTabValue, setMailTabValue] = useState(0);
  const deviceList: Device[] = getDeviceList();
  const sensorList: Sensor[] = getSensorList();

  return (
    <Box sx={{ height: "100%", width: "100%", display: "flex" }}>
      <Sidebar
        deviceList={deviceList}
        sensorList={sensorList}
        selectedDevice={selectedDevice}
        setSelectedDevice={setSelectedDevice}
        selectedSensor={selectedSensor}
        setSelectedSensor={setSelectedSensor}
        maintabValue={mailTabValue}
      />
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <MainTabs
          selectedDevice={selectedDevice}
          setSelectedDevice={setSelectedDevice}
          selectedSensor={selectedSensor}
          value={mailTabValue}
          setValue={setMailTabValue}
        />
      </Box>
    </Box>
  );
}

export default Create;

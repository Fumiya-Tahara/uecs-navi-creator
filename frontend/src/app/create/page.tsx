"use client";
import { getDeviceList, getSensorList } from "../../../stub/create-func";
import { Box } from "@mui/material";
import Sidebar from "./components/sidebar/sidebar";
import MainTabs from "./components/maintab/maintabs";
import { useState } from "react";
import { Device, Sensor } from "./interfaces/interfaces";

export interface SelectedSensor {
  value: number;
  sensor: number[];
}

function Create() {
  const [selectedDeviceIndex, setSelectedDeviceIndex] = useState<number[]>([]);
  const [selectedSensorIndex, setSelectedSensorIndex] = useState<
    SelectedSensor[]
  >([]);
  const deviceList: Device[] = getDeviceList();
  const sensorList: Sensor[] = getSensorList();

  return (
    <Box sx={{ height: "100%", width: "100%", display: "flex" }}>
      <Sidebar
        deviceList={deviceList}
        sensorList={sensorList}
        selectedDeviceIndex={selectedDeviceIndex}
        setSelectedDeviceIndex={setSelectedDeviceIndex}
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
          deviceList={deviceList}
          sensorList={sensorList}
          selectedDeviceIndex={selectedDeviceIndex}
          setSelectedDeviceIndex={setSelectedDeviceIndex}
        />
      </Box>
    </Box>
  );
}

export default Create;

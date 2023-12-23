"use client";
import { getDeviceList, getSensorList } from "../../../stub/create-func";
import { Box } from "@mui/material";
import Sidebar from "./components/sidebar";
import MainTabs from "./components/maintabs";
import { useState } from "react";

function Create() {
  const [selectedDevice, setSelectedDevice] = useState<number[]>([]);
  const deviceList: string[] = getDeviceList();
  const sensorList: string[] = getSensorList();
  console.log(selectedDevice);

  return (
    <div style={{ height: "100%", width: "100%", display: "flex" }}>
      <Sidebar
        deviceList={deviceList}
        sensorList={sensorList}
        selectedDevice={selectedDevice}
        setSelectedDevice={setSelectedDevice}
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
          selectedDevice={selectedDevice}
          setSelectedDevice={setSelectedDevice}
        />
      </Box>
    </div>
  );
}

export default Create;

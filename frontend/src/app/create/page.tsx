"use client";
import { Box } from "@mui/material";
import { AddDeviceButton } from "./components/add-device-button";
import { useState } from "react";
import { Device } from "./interfaces/interfaces";
import { getDeviceList } from "../../features/stub/create-func";
import { DeviceCard } from "./components/device-card";

function Create() {
  const [selectedDevice, setSelectedDevice] = useState<Device[]>([]);

  const deviceList: Device[] = getDeviceList();

  return (
    <div className="min-h-screen py-20">
      <Box sx={{ position: "fixed", bottom: "120px", right: "120px" }}>
        <AddDeviceButton
          deviceList={deviceList}
          selectedDevice={selectedDevice}
          setSelectedDevice={setSelectedDevice}
        />
      </Box>
      <div className="grid grid-cols-12 gap-4">
        {selectedDevice.length == 0 ? (
          <div className="col-start-4 col-span-6 flex justify-center items-center">
            <div className="text-4xl text-gray-300">
              デバイスを選択してください
            </div>
          </div>
        ) : (
          <div className="col-start-3 col-span-8 grid grid-cols-3 gap-20">
            {selectedDevice.map((device, index) => {
              return (
                <div key={index}>
                  <DeviceCard
                    device={device}
                    selectedDevice={selectedDevice}
                    setSelectedDevice={setSelectedDevice}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Create;

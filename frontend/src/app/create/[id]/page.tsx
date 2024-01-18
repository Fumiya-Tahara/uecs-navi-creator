"use client";
import {
  Tab,
  Tabs,
  Box,
  List,
  ListItem,
  IconButton,
  Button,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import { wholeTheme } from "@/features/themes/theme";
import { useEffect, useState } from "react";
import TransmissionParams from "./components/transmission-params";
import ReceptionParams from "./components/reception-parameter";
import { Device, Sensor } from "../interfaces/interfaces";
import {
  getSelectedDeviceList,
  getEnvConditionList,
} from "@/features/stub/create-func";
import { AddSensorButton } from "./components/add-sensor-button";
import CloseIcon from "@mui/icons-material/Close";
import { redirect, usePathname } from "next/navigation";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index } = props;
  return (
    <div hidden={value !== index} style={{ height: "100%" }}>
      {value == index ? children : null}
    </div>
  );
};

export default function Detail() {
  const [value, setValue] = useState(0);
  const [selectedSensor, setSelectedSensor] = useState<Sensor[]>([]);
  const [device, setDevice] = useState<Device>();
  const sensorList: Sensor[] = getEnvConditionList();

  // deviceIdを元にuseEffectでデバイス情報を取得する
  const pathName = usePathname();
  const splitPathName = pathName.split("/");
  const deviceId = splitPathName[splitPathName.length - 1];

  useEffect(() => {
    const selectedDevice: Device[] = getSelectedDeviceList();
    const idMatchedDevice: Device | undefined = selectedDevice.find(
      (device) => device.id == Number(deviceId)
    );
    if (!idMatchedDevice) {
      // リダイレクト
      redirect("/create");
    }
    setDevice(idMatchedDevice);
  }, [deviceId]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleDeleteDevice = (deviceName: string) => {
    const newSelectedSensor: Sensor[] = selectedSensor.filter(
      (selectedSensor) => selectedSensor.name != deviceName
    );
    setSelectedSensor(newSelectedSensor);
  };

  if (!device) {
    return;
  }

  return (
    <div className="min-h-screen py-16 px-20">
      <div
        className="p-16"
        style={{ backgroundColor: "rgb(209 213 219)", borderRadius: "12px" }}
      >
        <TransmissionParams device={device} />
      </div>
      <div className="pt-16">
        <div
          style={{
            width: "100%",
            borderBottom: "1px solid",
            borderColor: grey[700],
          }}
        >
          <ThemeProvider theme={wholeTheme}>
            <Tabs
              value={value}
              variant="scrollable"
              textColor="primary"
              indicatorColor="primary"
              onChange={handleTabChange}
            >
              <Tab value={0} label="環境条件" />
              {selectedSensor.map((sensorData, index) => {
                return (
                  <Tab key={index} value={index + 1} label={sensorData.name} />
                );
              })}
            </Tabs>
          </ThemeProvider>
        </div>
        <Box sx={{ height: "80vh" }}>
          <TabPanel value={value} index={0}>
            <div className="h-full relative p-16">
              <AddSensorButton
                sensorList={sensorList}
                selectedSensor={selectedSensor}
                setSelectedSensor={setSelectedSensor}
              />
              {selectedSensor.length == 0 ? (
                <div className="mt-16 flex justify-center items-center">
                  <div className="text-4xl text-gray-300">
                    環境条件を選択してください
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="m-0">環境条件</h2>
                  <div className="pt-6">
                    <List>
                      {selectedSensor.map((sensorData, index) => {
                        return (
                          <ListItem key={index}>
                            <div style={{ width: "1000%" }}>
                              {sensorData.name}
                            </div>
                            <IconButton
                              aria-label="close"
                              onClick={() =>
                                handleDeleteDevice(sensorData.name)
                              }
                            >
                              <CloseIcon />
                            </IconButton>
                          </ListItem>
                        );
                      })}
                    </List>
                  </div>
                </>
              )}
            </div>
          </TabPanel>
          {selectedSensor.map((sensorData, index) => {
            return (
              <TabPanel key={index} value={value} index={index + 1}>
                <div className="p-16">
                  <ReceptionParams sensor={sensorData} />
                </div>
              </TabPanel>
            );
          })}
        </Box>
      </div>
    </div>
  );
}

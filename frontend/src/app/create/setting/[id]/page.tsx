"use client";
import { ThemeProvider } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import { wholeTheme } from "@/features/themes/theme";
import { useEffect, useState } from "react";
import ReceptionParams from "./components/reception-params";
import { Device, EnvCondition } from "../../interfaces/interfaces";
import {
  getSelectedDeviceList,
  getEnvConditionList,
} from "@/features/stub/create-func";
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
  const [device, setDevice] = useState<Device>();
  const envConditionList: EnvCondition[] = getEnvConditionList();

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

  if (!device) {
    return;
  }

  return (
    <div className="min-h-screen py-16 px-20">
      <div
        className="p-16"
        style={{ backgroundColor: "rgb(209 213 219)", borderRadius: "12px" }}
      >
        <ReceptionParams device={device} />
      </div>
    </div>
  );
}

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
import { Box } from "@mui/material";
import { redirect, usePathname } from "next/navigation";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Link from "next/link";

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
    <div className="h-screen py-16 px-32">
      <Box
        sx={{
          position: "absolute",
          top: "80px",
          left: "20px",
        }}
      >
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
          sx={{ fontSize: "0.8rem" }}
        >
          <Link
            href="/create"
            style={{
              color: "inherit",
            }}
          >
            制御装置の作成
          </Link>
          <Link
            href="/create"
            style={{
              color: "inherit",
            }}
          >
            加温器
          </Link>
          <Link
            href="/create"
            style={{
              color: "inherit",
            }}
          >
            気温
          </Link>
          <Box>設定</Box>,
        </Breadcrumbs>
      </Box>
      <div
        className="py-6 px-6"
        style={{ backgroundColor: "rgb(209 213 219)", borderRadius: "12px" }}
      >
        <ReceptionParams device={device} />
      </div>
    </div>
  );
}

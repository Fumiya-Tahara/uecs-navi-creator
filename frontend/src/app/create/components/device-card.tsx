"use client";
import { Button, Card, IconButton } from "@mui/material";
import { Device } from "../interfaces/interfaces";
import CloseIcon from "@mui/icons-material/Close";
import Link from "next/link";
import { deviceIconMap } from "./icons_map";

interface DeviceCardProps {
  device: Device;
  selectedDevice: Device[];
  setSelectedDevice: React.Dispatch<React.SetStateAction<Device[]>>;
}

export function DeviceCard(props: DeviceCardProps) {
  const { device, selectedDevice, setSelectedDevice } = props;
  const handleDeleteDevice = (deviceId: number) => {
    const newSelectedDevice: Device[] = selectedDevice.filter(
      (selectedDevice) => selectedDevice.id != deviceId
    );
    setSelectedDevice(newSelectedDevice);
  };

  return (
    <div>
      <Card
        sx={{
          padding: "16px",
          backgroundColor: "rgb(209 213 219)",
          borderRadius: "12px",
          width: "100%",
          aspectRatio: "2/3",
        }}
      >
        <div className="flex flex-col justify-between h-full">
          <div>
            <div className="flex justify-end">
              <IconButton
                aria-label="close"
                onClick={() => handleDeleteDevice(device.id)}
              >
                <CloseIcon />
              </IconButton>
            </div>
            <div className="flex items-center">
              {deviceIconMap[device.name]}
              <h3 className="m-0">{device.name}</h3>
            </div>
            <div className="mt-6">
              <h4 className="m-0">{device.envCondition}</h4>
              <div className="mt-4 flex justify-center items-center">
                <div className="text-7xl">--</div>
                <div>{device.unit}</div>
              </div>
            </div>
            <div>
              <h4 className="m-0 mt-6">反映時間</h4>
              <div className="mt-4 flex text-2xl">
                <div>00:00</div>
                <div>〜</div>
                <div>00:00</div>
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <Link href={`/create/${device.id}`}>
              <Button variant="outlined" size="small">
                パラメータ設定
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}

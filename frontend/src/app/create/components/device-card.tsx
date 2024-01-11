"use client";
import { Button, Card, IconButton } from "@mui/material";
import { Device } from "../interfaces/interfaces";
import CloseIcon from "@mui/icons-material/Close";
import Link from "next/link";

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
          backgroundColor: "#D9D9D9",
          borderRadius: "12px",
          width: "100%",
          aspectRatio: "2/3",
        }}
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-end">
            <IconButton
              aria-label="close"
              onClick={() => handleDeleteDevice(device.id)}
            >
              <CloseIcon />
            </IconButton>
          </div>
          <div className="flex-grow">
            <div>{device.name}</div>
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

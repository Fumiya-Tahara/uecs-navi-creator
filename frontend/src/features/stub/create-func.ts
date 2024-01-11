import { Sensor, Device } from "../../app/create/interfaces/interfaces";

export function getDeviceList() {
  const deviceList: Device[] = [
    {
      id: 1,
      name: "温度調節器",
      controllParam: "気温",
      unit: "度",
    },
    {
      id: 2,
      name: "噴霧器",
      controllParam: "湿度",
      unit: "%",
    },
    {
      id: 3,
      name: "CO2供給装置",
      controllParam: "CO2濃度",
      unit: "ppm",
    },
    {
      id: 4,
      name: "照明",
      controllParam: "光量",
      unit: "ルクス",
    },
  ];
  return deviceList;
}

export function getSensorList() {
  const sensorList: Sensor[] = [
    { id: 1, name: "気温", unit: "度" },
    { id: 2, name: "湿度", unit: "%" },
  ];
  return sensorList;
}

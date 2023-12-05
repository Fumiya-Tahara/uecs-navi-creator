import { Sensor, Device } from "../../app/createA/interfaces/interfaces";

export function getDeviceList() {
  const deviceList: Device[] = [
    {
      name: "温度調節器",
      controllParam: "気温",
      unit: "度",
    },
    {
      name: "噴霧器",
      controllParam: "湿度",
      unit: "%",
    },
    {
      name: "CO2供給装置",
      controllParam: "CO2濃度",
      unit: "ppm",
    },
    {
      name: "照明",
      controllParam: "光量",
      unit: "ルクス",
    },
  ];
  return deviceList;
}

export function getSensorList() {
  const sensorList: Sensor[] = [
    { name: "気温", unit: "度" },
    { name: "湿度", unit: "%" },
  ];
  return sensorList;
}

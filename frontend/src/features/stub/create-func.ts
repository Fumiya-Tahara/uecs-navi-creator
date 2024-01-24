import {
  Sensor,
  Device,
  ReceptionParams,
} from "../../app/create/interfaces/interfaces";

export function getDeviceList() {
  const deviceList: Device[] = [
    {
      id: 1,
      name: "加温器",
      envCondition: "気温",
      unit: "℃",
      ccm_type: "InAirTemp",
    },
    {
      id: 2,
      name: "噴霧器",
      envCondition: "湿度",
      unit: "%",
      ccm_type: "InAirHumidity",
    },
    {
      id: 3,
      name: "CO2供給装置",
      envCondition: "CO2濃度",
      unit: "ppm",
      ccm_type: "InAirCO2",
    },
    {
      id: 4,
      name: "照明",
      envCondition: "光量",
      unit: "Lux",
      ccm_type: "InLight",
    },
  ];
  return deviceList;
}

export function getEnvConditionList() {
  const sensorList: Sensor[] = [
    { id: 1, name: "気温", unit: "度" },
    { id: 2, name: "湿度", unit: "%" },
  ];
  return sensorList;
}

export function getSelectedDeviceList() {
  const selectedDeviceList: Device[] = [
    {
      id: 1,
      name: "加温器",
      envCondition: "気温",
      unit: "℃",
      ccm_type: "InAirTemp",
    },
    {
      id: 2,
      name: "噴霧器",
      envCondition: "湿度",
      unit: "%",
      ccm_type: "InAirHumidity",
    },
  ];
  return selectedDeviceList;
}

export function getReceptionParams(): ReceptionParams[] {
  const receptionParams: ReceptionParams[] = [
    {
      valid: true,
      room: 1,
      region: 1,
      order: 1,
      priority: 1,
      lv: 1,
      cast: 1,
      sr: "s",
      ccm_type: "InAirTemp",
      unit: "℃",
      srhr: 10,
      stmn: 0,
      edhr: 12,
      edmn: 0,
      inmn: 1,
      dumn: 1,
      rly_l: 1,
      rly_h: 1,
    },
    {
      valid: true,
      room: 1,
      region: 1,
      order: 1,
      priority: 1,
      lv: 1,
      cast: 1,
      sr: "s",
      ccm_type: "InAirTemp",
      unit: "℃",
      srhr: 12,
      stmn: 0,
      edhr: 14,
      edmn: 0,
      inmn: 1,
      dumn: 1,
      rly_l: 1,
      rly_h: 1,
    },
  ];
  return receptionParams;
}

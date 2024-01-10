export interface Device {
  id: number;
  name: string;
  controllParam: string;
  unit: string;
}

export interface Sensor {
  id: number;
  name: string;
  unit: string;
}

export interface ReceptionParams {
  valid: boolean;
  room: number;
  region: number;
  order: number;
  priority: number;
  lv: string;
  cast: number;
  sr: string;
  ccm_type: string;
  unit: string;
  srhr: number;
  stmn: number;
  edhr: number;
  edmn: number;
  inmn: number;
  dumn: number;
  rly_l: number;
  rly_h: number;
  alignment: number; // 仮
}

export interface TransmissionParams {
  valid: boolean;
  room: number;
  region: number;
  order: number;
  priority: number;
  lv: string;
  cast: number;
  sr: string;
  ccm_type: string;
  unit: string;
  srhr: number;
  stmn: number;
  edhr: number;
  edmn: number;
  inmn: number;
  dumn: number;
  rly_l: number;
  rly_h: number;
  alignment: number; // 仮
}

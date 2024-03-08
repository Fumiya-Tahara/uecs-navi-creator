export interface Device {
  id: number;
  name: string;
  envCondition: string;
  unit: string;
  ccm_type: string;
}

export interface EnvCondition {
  id: number;
  name: string;
  unit: string;
}

export interface ReceptionParams {
  id: number;
  valid: boolean;
  room: number;
  region: number;
  order: number;
  priority: number;
  lv: number;
  cast: number;
  sr: string;
  ccm_type: string;
  unit: string;
  sthr: number;
  stmn: number;
  edhr: number;
  edmn: number;
  inmn: number;
  dumn: number;
  rly_l: number;
  rly_h: number;
}

export interface TransmissionParams {
  valid: boolean;
  room: number;
  region: number;
  order: number;
  priority: number;
  lv: number;
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
}

export interface ReceptionParams {
  valid: boolean;
  room: number;
  region: number;
  order: number;
  priority: number;
  lv: number;
  cast: number;
  sr: string;
  ccm_type: string;
  unit: string;
  sthr: number;
  stmn: number;
  edhr: number;
  edmn: number;
  inmn: number;
  dumn: number;
  rly_l: number;
  rly_h: number;
}

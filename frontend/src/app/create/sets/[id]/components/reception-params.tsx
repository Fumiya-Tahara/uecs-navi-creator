import {
  Switch,
  TextField,
  InputAdornment,
  Select,
  SelectChangeEvent,
  FormControl,
  InputLabel,
  MenuItem,
  Box,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { Device } from "../../../interfaces/interfaces";
import { useState } from "react";
import { deviceIconMap } from "../../../components/icons_map";

interface ReceptionParamsProps {
  device: Device;
}

export default function ReceptionParams(props: ReceptionParamsProps) {
  const { device } = props;
  const [checked, setChecked] = useState(false);
  const [level, setLevel] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setLevel(event.target.value as string);
  };

  return (
    <>
      <div className="flex items-center">
        {deviceIconMap[device.name]}
        <h2 className="m-0">{device.name}</h2>
      </div>
      <div className="pt-6">
        <div>
          <div>
            <h5 className="mb-1">設定を有効にする</h5>
            <Switch checked={checked} onChange={() => setChecked(!checked)} />
          </div>
          <div>
            <h5 className="mt-7 mb-4">設定パラメータ</h5>
            <TextField
              label={device.envCondition}
              type="number"
              size="small"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">{device.unit}</InputAdornment>
                ),
              }}
              InputLabelProps={{
                shrink: true,
              }}
              sx={{ marginRight: "8px" }}
            />
            <TextField
              label="小数点以下の桁数"
              type="number"
              size="small"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">桁</InputAdornment>
                ),
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <div>
            <h5 className="mt-10 mb-4">反映時間</h5>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker
                label="反映開始"
                ampm={false}
                slots={{
                  textField: (props) => (
                    <TextField
                      {...props}
                      size="small"
                      InputLabelProps={{ shrink: true }}
                    />
                  ),
                }}
                sx={{ marginRight: "8px" }}
              />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker
                label="反映終了"
                ampm={false}
                slots={{
                  textField: (props) => (
                    <TextField
                      {...props}
                      size="small"
                      InputLabelProps={{ shrink: true }}
                    />
                  ),
                }}
              />
            </LocalizationProvider>
          </div>
          <div>
            <h5 className="mt-10 mb-4">反映時間間隔 / 作用時間</h5>
            <TextField
              label="反映時間"
              type="number"
              size="small"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">分</InputAdornment>
                ),
              }}
              InputLabelProps={{
                shrink: true,
              }}
              sx={{ marginRight: "8px" }}
            />
            <TextField
              label="反映時間間隔"
              type="number"
              size="small"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">分</InputAdornment>
                ),
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>

          <div>
            <h5 className="mt-10 mb-4">ROOM / REGION / ORDER / PRIORITY</h5>
            <div className="mt-2 grid grid-cols-12 gap-2">
              <TextField
                label="ROOM"
                type="number"
                size="small"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                label="REGION"
                type="number"
                size="small"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                label="ORDER"
                type="number"
                size="small"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                label="PRIORITY"
                type="number"
                size="small"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
          </div>

          <div>
            <h5 className="mt-10 mb-4">リレー</h5>
          </div>
        </div>
      </div>
    </>
  );
}

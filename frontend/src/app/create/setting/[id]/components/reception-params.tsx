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
  FormGroup,
  FormControlLabel,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { Device } from "../../../interfaces/interfaces";
import { useState } from "react";
import { envConditionIconMap } from "../../../components/icons_map";

interface ReceptionParamsProps {
  device: Device;
}

export default function ReceptionParams(props: ReceptionParamsProps) {
  const { device } = props;
  const [checked, setChecked] = useState(false);
  const [cmpope, setCmpope] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setCmpope(event.target.value as string);
  };

  return (
    <>
      <div className="flex items-center">
        {envConditionIconMap["気温"]}
        <h2 className="m-0">気温</h2>
      </div>
      <div className="pt-3">
        <div>
          <div>
            <h5 className="mb-1">設定を有効にする</h5>
            <Switch checked={checked} onChange={() => setChecked(!checked)} />
          </div>
          <div>
            <h5 className="mt-7 mb-4">設定パラメータ</h5>
            <div className="flex items-center">
              <div>気温</div>
              <Select
                value={cmpope}
                size="small"
                onChange={handleChange}
                sx={{ marginX: "8px" }}
              >
                <MenuItem value={1}>{"="}</MenuItem>
                <MenuItem value={2}>{">"}</MenuItem>
                <MenuItem value={3}>{"<"}</MenuItem>
                <MenuItem value={4}>{"≥"}</MenuItem>
                <MenuItem value={5}>{"≤"}</MenuItem>
              </Select>
              <TextField
                type="number"
                size="small"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">{"℃"}</InputAdornment>
                  ),
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                sx={{ marginRight: "8px" }}
              />
            </div>
          </div>
          <div className="flex">
            <div>
              <h5 className="mt-9 mb-4">反映時間</h5>
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
            <div className="pl-12">
              <h5 className="mt-9 mb-4">反映時間間隔 / 作用時間</h5>
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
          </div>

          <div>
            <h5 className="mt-9 mb-4">ROOM / REGION / ORDER / PRIORITY</h5>
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
            <h5 className="mt-9 mb-4">リレーの選択</h5>
            <div>
              <FormGroup aria-label="position" row>
                <FormControlLabel
                  control={<Switch sx={{ transform: "rotateZ(-90deg)" }} />}
                  label={<span className="text-xs">リレー1</span>}
                  labelPlacement="bottom"
                />
                <FormControlLabel
                  control={<Switch sx={{ transform: "rotateZ(-90deg)" }} />}
                  label={<span className="text-xs">リレー2</span>}
                  labelPlacement="bottom"
                />
                <FormControlLabel
                  control={<Switch sx={{ transform: "rotateZ(-90deg)" }} />}
                  label={<span className="text-xs">リレー3</span>}
                  labelPlacement="bottom"
                />
                <FormControlLabel
                  control={<Switch sx={{ transform: "rotateZ(-90deg)" }} />}
                  label={<span className="text-xs">リレー4</span>}
                  labelPlacement="bottom"
                />
                <FormControlLabel
                  control={<Switch sx={{ transform: "rotateZ(-90deg)" }} />}
                  label={<span className="text-xs">リレー5</span>}
                  labelPlacement="bottom"
                />
                <FormControlLabel
                  control={<Switch sx={{ transform: "rotateZ(-90deg)" }} />}
                  label={<span className="text-xs">リレー6</span>}
                  labelPlacement="bottom"
                />
                <FormControlLabel
                  control={<Switch sx={{ transform: "rotateZ(-90deg)" }} />}
                  label={<span className="text-xs">リレー7</span>}
                  labelPlacement="bottom"
                />
                <FormControlLabel
                  control={<Switch sx={{ transform: "rotateZ(-90deg)" }} />}
                  label={<span className="text-xs">リレー8</span>}
                  labelPlacement="bottom"
                />
              </FormGroup>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

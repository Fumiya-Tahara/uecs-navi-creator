import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import Co2Icon from "@mui/icons-material/Co2";
import LightIcon from "@mui/icons-material/Light";
import { createTheme, ThemeProvider } from "@mui/material/styles";

interface iconMap {
  [key: string]: JSX.Element;
}

const iconTheme = createTheme({
  palette: {
    primary: {
      main: "rgb(107 114 128)",
    },
  },
});

export const envConditionIconMap: iconMap = {
  気温: (
    <ThemeProvider theme={iconTheme}>
      <DeviceThermostatIcon fontSize="large" color="primary" />
    </ThemeProvider>
  ),
  湿度: (
    <ThemeProvider theme={iconTheme}>
      <WaterDropIcon fontSize="large" color="primary" />
    </ThemeProvider>
  ),
  // CO2供給装置: (
  //   <ThemeProvider theme={iconTheme}>
  //     <Co2Icon fontSize="large" color="primary" />
  //   </ThemeProvider>
  // ),
  // 照明: (
  //   <ThemeProvider theme={iconTheme}>
  //     <LightIcon fontSize="large" color="primary" />
  //   </ThemeProvider>
  // ),
};

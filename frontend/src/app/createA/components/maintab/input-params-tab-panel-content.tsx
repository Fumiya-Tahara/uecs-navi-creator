import { Box, List, ListItem } from "@mui/material";
import { ReceptionParam } from "./reception-parameter";
import { TransmissionParam } from "./transmission-parameter";
import { Device, Sensor } from "../../interfaces/interfaces";

interface InputParamsTabPanelContentProps {
  deviceData: Device;
  sensorDataList: Sensor[];
}

export function InputParamsTabPanelContent(
  props: InputParamsTabPanelContentProps
) {
  const { deviceData, sensorDataList } = props;

  return (
    <>
      <Box sx={{ padding: "8px 16px" }}>
        <Box sx={{ fontWeight: "bold" }}>送信パラメータ</Box>
        <TransmissionParam
          param={deviceData.controllParam}
          unit={deviceData.unit}
        ></TransmissionParam>
      </Box>
      <Box sx={{ paddingY: "8px", marginTop: "30px" }}>
        <Box sx={{ paddingX: "16px", fontWeight: "bold" }}>受信パラメータ</Box>
        <List>
          {sensorDataList.map((param, index) => {
            return (
              <ListItem key={index}>
                <ReceptionParam name={param.name} unit={param.unit} />
              </ListItem>
            );
          })}
        </List>
      </Box>
    </>
  );
}

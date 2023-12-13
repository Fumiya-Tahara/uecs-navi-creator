import "./styles/create.css";
import DevicesIcon from "@mui/icons-material/Devices";
import SensorsIcon from "@mui/icons-material/Sensors";
import { List, ListItem } from "@mui/material";
import DeviceCard from "./components/device-card";
import { getDeviceList } from "../../../stub/create-func";

function Create() {
  const deviceList: string[] = getDeviceList();

  return (
    <div className="h-screen">
      {/* sidebar */}
      <div className="w-1/5 h-full">
        <div className="bg-slate-950 text-white">
          <ul className="flex">
            <li className="m-2">
              <DevicesIcon fontSize="large" />
            </li>
            <li className="m-2">
              <SensorsIcon fontSize="large" />
            </li>
          </ul>
        </div>
        <div className="bg-gray-50 h-full">
          <List
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {deviceList.map((deviceName) => (
              <ListItem key={deviceName} sx={{ width: "80%" }}>
                <DeviceCard deviceName={deviceName} />
              </ListItem>
            ))}
          </List>
        </div>
      </div>
    </div>
  );
}

export default Create;

import { getDeviceList, getSensorList } from "../../../stub/create-func";
import { Sidebar } from "./components/sidebar";

function Create() {
  const deviceList: string[] = getDeviceList();
  const sensorList: string[] = getSensorList();

  return (
    <div className="h-screen">
      <Sidebar deviceList={deviceList} sensorList={sensorList} />
    </div>
  );
}

export default Create;

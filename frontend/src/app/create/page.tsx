"use client";
import { Box } from "@mui/material";
import { AddDeviceButton } from "./components/add-device-button";

function Create() {
  return (
    <div className="h-screen">
      <Box sx={{ position: "fixed", bottom: "120px", right: "150px" }}>
        <AddDeviceButton />
      </Box>
      <div className="h-full grid grid-cols-12 gap-4">
        <div className="h-1/2 col-start-4 col-span-6 flex justify-center items-center">
          <div className="text-5xl text-gray-300">
            デバイスを選択してください
          </div>
        </div>
      </div>
    </div>
  );
}

export default Create;

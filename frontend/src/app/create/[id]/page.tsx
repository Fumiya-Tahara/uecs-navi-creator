"use client";
import { Tab, Tabs } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import { wholeTheme } from "@/features/themes/theme";
import { useState } from "react";

export default function Detail() {
  const [value, setValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className="h-screen p-20">
      <div className="h-1/2"></div>
      <div>
        <div
          style={{
            width: "100%",
            border: "solid",
            borderColor: grey[700],
          }}
        >
          <ThemeProvider theme={wholeTheme}>
            <Tabs
              value={value}
              variant="scrollable"
              textColor="primary"
              indicatorColor="primary"
              onChange={handleTabChange}
            >
              <Tab value={0} label="選択センサー" />
            </Tabs>
          </ThemeProvider>
        </div>
      </div>
    </div>
  );
}

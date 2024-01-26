"use client";
import { Box, Breadcrumbs } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { AddEnvConditionButton } from "./components/add-env-condition-button";
import { useState } from "react";
import { EnvCondition } from "./interfaces/interfaces";
import { getEnvConditionList } from "../../features/stub/create-func";
import { EnvConditionCard } from "./components/env-condition-card";
import { grey } from "@mui/material/colors";
import Link from "next/link";

function Create() {
  const [selectedEnvCondition, setSelectedEnvCondition] = useState<
    EnvCondition[]
  >([]);

  const envConditionList: EnvCondition[] = getEnvConditionList();

  return (
    <div className="min-h-screen py-20">
      <Box sx={{ position: "fixed", bottom: "120px", right: "120px" }}>
        <AddEnvConditionButton
          envConditionList={envConditionList}
          selectedEnvCondition={selectedEnvCondition}
          setSelectedEnvCondition={setSelectedEnvCondition}
        />
      </Box>
      <Box
        sx={{
          position: "absolute",
          top: "80px",
          left: "20px",
        }}
      >
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
          sx={{ fontSize: "0.8rem" }}
        >
          <Link
            href="/create"
            style={{
              color: "inherit",
            }}
          >
            制御装置の作成
          </Link>
          <Box>加温器</Box>,
        </Breadcrumbs>
      </Box>
      <div className="grid grid-cols-12 gap-4">
        {selectedEnvCondition.length == 0 ? (
          <div className="col-start-4 col-span-6 flex justify-center items-center">
            <div className="text-4xl text-gray-300">
              環境条件を追加してください
            </div>
          </div>
        ) : (
          <div className="col-start-3 col-span-8 grid grid-cols-3 gap-20">
            {selectedEnvCondition.map((envCondition, index) => {
              return (
                <div key={index}>
                  <EnvConditionCard
                    envCondition={envCondition}
                    selectedEnvCondition={selectedEnvCondition}
                    setSelectedEnvCondition={setSelectedEnvCondition}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Create;

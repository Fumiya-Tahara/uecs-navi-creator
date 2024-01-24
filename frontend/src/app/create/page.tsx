"use client";
import { Box } from "@mui/material";
import { AddEnvConditionButton } from "./components/add-env-condition-button";
import { useState } from "react";
import { EnvCondition } from "./interfaces/interfaces";
import { getEnvConditionList } from "../../features/stub/create-func";
import { EnvConditionCard } from "./components/env-condition-card";

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

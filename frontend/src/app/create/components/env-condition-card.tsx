"use client";
import { Button, Card, IconButton } from "@mui/material";
import { EnvCondition } from "../interfaces/interfaces";
import CloseIcon from "@mui/icons-material/Close";
import Link from "next/link";
import { envConditionIconMap } from "./icons_map";

interface EnvConditionCardProps {
  envCondition: EnvCondition;
  selectedEnvCondition: EnvCondition[];
  setSelectedEnvCondition: React.Dispatch<React.SetStateAction<EnvCondition[]>>;
}

export function EnvConditionCard(props: EnvConditionCardProps) {
  const { envCondition, selectedEnvCondition, setSelectedEnvCondition } = props;
  const handleDeleteEnvCondition = (envConditionId: number) => {
    const newSelectedEnvCondition: EnvCondition[] = selectedEnvCondition.filter(
      (selectedEnvCondition) => selectedEnvCondition.id != envConditionId
    );
    setSelectedEnvCondition(newSelectedEnvCondition);
  };

  return (
    <div>
      <Card
        raised={true}
        sx={{
          padding: "16px",
          backgroundColor: "rgb(209 213 219)",
          borderRadius: "12px",
          width: "100%",
          aspectRatio: "2/3",
        }}
      >
        <div className="flex flex-col justify-between h-full">
          <div>
            <div className="flex justify-end">
              <IconButton
                aria-label="close"
                onClick={() => handleDeleteEnvCondition(envCondition.id)}
              >
                <CloseIcon />
              </IconButton>
            </div>
            <div className="flex items-center">
              {envConditionIconMap[envCondition.name]}
              <h3 className="m-0">{envCondition.name}</h3>
            </div>
            <div className="mt-6">
              <h4 className="m-0">メモ</h4>
            </div>
          </div>
          <div className="flex justify-end">
            <Link href={`/create/list/${envCondition.id}`}>
              <Button variant="outlined" size="small">
                パラメータ設定
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}

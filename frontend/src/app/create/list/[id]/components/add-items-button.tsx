"use client";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { ThemeProvider, IconButton } from "@mui/material";
import { wholeTheme } from "@/features/themes/theme";
import { styled } from "@mui/system";
import { ReceptionParams } from "../../../interfaces/interfaces";

interface AddItemsButtonProps {
  paramList: ReceptionParams[];
  setParamList: React.Dispatch<React.SetStateAction<ReceptionParams[]>>;
}

const LargeIconButton = styled(IconButton)({
  fontSize: "80px",
});

const LargeAddCircleIcon = styled(AddCircleIcon)({
  fontSize: "80px",
});

export function AddItemsButton(props: AddItemsButtonProps) {
  const { paramList, setParamList } = props;

  const handleClick = () => {
    const newParamList: ReceptionParams[] = [
      ...paramList,
      {
        id: 1,
        valid: true,
        room: 1,
        region: 1,
        order: 1,
        priority: 1,
        lv: 1,
        cast: 1,
        sr: "s",
        ccm_type: "InAirTemp",
        unit: "℃",
        sthr: 0,
        stmn: 0,
        edhr: 0,
        edmn: 0,
        inmn: 0,
        dumn: 0,
        rly_l: 1,
        rly_h: 1,
      },
    ];
    setParamList(newParamList);
  };

  return (
    <div>
      <ThemeProvider theme={wholeTheme}>
        <LargeIconButton onClick={handleClick} color="primary">
          <LargeAddCircleIcon />
        </LargeIconButton>
      </ThemeProvider>
    </div>
  );
}

"use client";
import {
  Paper,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Toolbar,
  TextField,
  InputAdornment,
  FormControl,
  Select,
  MenuItem,
  ThemeProvider,
  IconButton,
  TableFooter,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { wholeTheme } from "@/features/themes/theme";
import { useEffect, useState } from "react";

export interface ReceptionParams {
  valid: boolean;
  room: number;
  region: number;
  order: number;
  priority: number;
  lv: number;
  cast: number;
  sr: string;
  ccm_type: string;
  unit: string;
  sthr: number;
  stmn: number;
  edhr: number;
  edmn: number;
  inmn: number;
  dumn: number;
  rly_l: number;
  rly_h: number;
}

interface TableListProps {
  allIsValid: boolean;
}

const TableList = (props: TableListProps) => {
  const { allIsValid } = props;
  const [isValid, setIsValid] = useState<boolean>(false);
  const [param, setParamList] = useState<ReceptionParams>({
    valid: false,
    room: 0,
    region: 0,
    order: 0,
    priority: 0,
    lv: 0,
    cast: 1,
    sr: "R",
    ccm_type: "",
    unit: "UNIT",
    sthr: 0,
    stmn: 0,
    edhr: 0,
    edmn: 0,
    inmn: 0,
    dumn: 0,
    rly_l: 0,
    rly_h: 0,
  });

  useEffect(() => {
    setIsValid(allIsValid);
  }, [allIsValid]);

  return (
    <TableRow>
      <TableCell>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Checkbox
            checked={isValid}
            onChange={(event) => {
              setIsValid(event.target.checked);
            }}
          />
        </Box>
      </TableCell>
      <TableCell align="right">
        <TextField
          label="CCM Type"
          size="small"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </TableCell>
      <TableCell align="right">
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <TextField
            type="number"
            size="small"
            inputProps={{ min: 0, max: 23 }}
          ></TextField>
          <Box>：</Box>
          <TextField
            type="number"
            size="small"
            inputProps={{ min: 0, max: 59 }}
          ></TextField>
          <Box>〜</Box>
          <TextField
            type="number"
            size="small"
            inputProps={{ min: 0, max: 23 }}
          ></TextField>
          <Box>：</Box>
          <TextField
            type="number"
            size="small"
            inputProps={{ min: 0, max: 59 }}
          ></TextField>
        </Box>
      </TableCell>
      <TableCell align="right">
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <TextField
            label="間隔"
            type="number"
            size="small"
            InputProps={{
              endAdornment: <InputAdornment position="end">分</InputAdornment>,
            }}
            inputProps={{ min: 0, max: 99 }}
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ marginRight: "8px" }}
          />
          <TextField
            label="作用時間"
            type="number"
            size="small"
            InputProps={{
              endAdornment: <InputAdornment position="end">分</InputAdornment>,
            }}
            inputProps={{ min: 0, max: 99 }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Box>
      </TableCell>
      <TableCell align="right">
        <Box sx={{ display: "flex", gap: "4px", justifyContent: "flex-end" }}>
          <TextField type="number" size="small" />
          <TextField type="number" size="small" />
          <TextField type="number" size="small" />
          <TextField type="number" size="small" />
        </Box>
      </TableCell>
      <TableCell align="right">
        <FormControl sx={{ width: "100%" }} size="small">
          <Select
            value={param?.lv}
            onChange={(event) => {
              const lv = event.target.value;
              setParamList({ ...param, lv: Number(lv) });
            }}
            style={{ width: "130px" }}
          >
            <MenuItem value={0}></MenuItem>
            <MenuItem value={1}>A-1S-0</MenuItem>
            <MenuItem value={2}>A-1S-1</MenuItem>
            <MenuItem value={3}>A-10S-0</MenuItem>
            <MenuItem value={4}>A-10S-1</MenuItem>
            <MenuItem value={5}>A-1M-0</MenuItem>
            <MenuItem value={6}>A-1M-1</MenuItem>
            <MenuItem value={7}>B-0</MenuItem>
            <MenuItem value={8}>B-1</MenuItem>
            <MenuItem value={9}>S-1S-0</MenuItem>
            <MenuItem value={10}>S-1M-0</MenuItem>
          </Select>
        </FormControl>
      </TableCell>
    </TableRow>
  );
};

export function ReceptionParams() {
  const [paramCount, setParamCount] = useState<number>(1);
  const [allIsValid, setAllIsValid] = useState<boolean>(false);

  const handleParamCount = () => {
    if (paramCount == 30) {
      return;
    }
    setParamCount(paramCount + 1);
  };

  return (
    <>
      <Paper sx={{ width: "92%", paddingRight: "8px" }}>
        <TableContainer>
          <Toolbar>受信CCM</Toolbar>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right" width={"3%"}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Checkbox
                      onChange={(event) => {
                        setAllIsValid(event.target.checked);
                      }}
                      checked={allIsValid}
                    />
                    Valid
                  </Box>
                </TableCell>
                <TableCell align="right" width={"14%"}>
                  CCM Type
                </TableCell>
                <TableCell align="right" width={"26%"}>
                  反映時間
                </TableCell>
                <TableCell align="right" width={"18%"}>
                  反映時間間隔/作用時間
                </TableCell>
                <TableCell align="right" width={"25%"}>
                  ROOM / REGION / ORDER / PRIORITY
                </TableCell>
                <TableCell align="right" width={"13%"}>
                  Level
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {[...Array(paramCount)].map((_, index) => (
                <TableList key={index} allIsValid={allIsValid} />
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={6} align="right">
                  <ThemeProvider theme={wholeTheme}>
                    <IconButton
                      onClick={() => {
                        handleParamCount();
                      }}
                      color="primary"
                    >
                      <AddCircleIcon />
                    </IconButton>
                  </ThemeProvider>
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
}

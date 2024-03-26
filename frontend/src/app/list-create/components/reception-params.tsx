"use client";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Toolbar,
} from "@mui/material";
import { useState } from "react";

export interface ReceptionParams {
  id: number;
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

export function ReceptionParams() {
  const [paramList, setParamList] = useState<ReceptionParams[]>([]);

  return (
    <>
      <Paper sx={{ width: "80%" }}>
        <TableContainer>
          <Toolbar>受信CCM</Toolbar>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell align="right">CCM Type</TableCell>
                <TableCell align="right">反映時間</TableCell>
                <TableCell align="right">反映時間間隔/作用時間</TableCell>
                <TableCell align="right">
                  ROOM / REGION / ORDER / PRIORITY
                </TableCell>
                <TableCell align="right">Level</TableCell>
              </TableRow>
            </TableHead>
            {/* <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody> */}
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
}

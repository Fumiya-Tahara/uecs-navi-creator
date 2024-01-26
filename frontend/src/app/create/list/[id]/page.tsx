"use client";
import {
  List,
  ListItem,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Breadcrumbs,
} from "@mui/material";
import { ReceptionParams } from "../../interfaces/interfaces";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { grey } from "@mui/material/colors";
import { SyntheticEvent, useEffect, useState } from "react";
import { getReceptionParams } from "@/features/stub/create-func";
import Link from "next/link";
import { AddItemsButton } from "./components/add-items-button";

export default function Sets() {
  const [paramList, setParamList] = useState<ReceptionParams[]>([]);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement>();

  // useEffect(() => {
  //   // APIからパラメータを取得する
  //   const savedParamList: ReceptionParams[] = getReceptionParams();
  //   setParamList(savedParamList);
  // }, []);

  const handleClick = (event: SyntheticEvent) => {
    if (!(event.currentTarget instanceof HTMLButtonElement)) {
      return;
    }
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(undefined);
  };

  return (
    <div className="min-h-screen py-24 px-20">
      <Box sx={{ position: "fixed", bottom: "120px", right: "120px" }}>
        <AddItemsButton paramList={paramList} setParamList={setParamList} />
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
          <Link
            href="/create"
            style={{
              color: "inherit",
            }}
          >
            加温器
          </Link>
          <Box>気温</Box>,
        </Breadcrumbs>
      </Box>
      <div
        className="py-2 px-4"
        style={{
          color: grey[600],
          borderBottom: "solid",
          borderColor: grey[600],
        }}
      >
        <div className="w-4/5 grid grid-cols-4 gap-4">
          <div>反映時間</div>
          <div>反映時間間隔</div>
          <div>作用時間</div>
          <div>設定パラメータ</div>
        </div>
      </div>
      {paramList.length != 0 ? (
        <div>
          <List>
            {paramList.map((param, index) => {
              return (
                <ListItem
                  key={index}
                  sx={{
                    "&:hover": {
                      backgroundColor: "rgb(223, 224, 226)",
                    },
                  }}
                >
                  <div className="w-full flex justify-between">
                    <div className="w-4/5 grid grid-cols-4 gap-4">
                      <div className="font-black">
                        {param.sthr == 0 ? "00" : param.sthr}:
                        {param.stmn == 0 ? "00" : param.stmn}〜
                        {param.edhr == 0 ? "00" : param.edhr}:
                        {param.edmn == 0 ? "00" : param.edmn}
                      </div>
                      <div>{param.inmn}分</div>
                      <div>{param.dumn}分</div>
                      <div>気温--℃</div>
                    </div>
                    <IconButton onClick={handleClick}>
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      id="simple-menu"
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                    >
                      <MenuItem onClick={handleClose}>
                        <Link
                          href={`/create/setting/${param.id}`}
                          style={{
                            color: "#1a1a1c",
                            textDecoration: "none",
                          }}
                        >
                          設定する
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose} sx={{ color: "#d32f2f" }}>
                        削除する
                      </MenuItem>
                    </Menu>
                  </div>
                </ListItem>
              );
            })}
          </List>
        </div>
      ) : null}
    </div>
  );
}

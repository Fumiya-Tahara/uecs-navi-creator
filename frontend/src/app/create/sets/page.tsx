"use client";
import { List, ListItem } from "@mui/material";
import { ReceptionParams } from "../interfaces/interfaces";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { grey } from "@mui/material/colors";
import styled from "@emotion/styled/macro";
import { useEffect, useState } from "react";
import { getReceptionParams } from "@/features/stub/create-func";

export default function Sets() {
  const [paramList, setParamList] = useState<ReceptionParams[]>([]);

  useEffect(() => {
    // APIからパラメータを取得する
    const savedParamList: ReceptionParams[] = getReceptionParams();
    setParamList(savedParamList);
  }, []);

  return (
    <div className="min-h-screen py-20 px-20">
      {paramList.length == 0 ? (
        <div className="mt-16 flex justify-center items-center">
          <div className="text-4xl text-gray-300">設定を追加してください</div>
        </div>
      ) : (
        <>
          <div>
            <div
              className="py-2 px-4"
              style={{
                color: grey[400],
                borderBottom: "solid",
                borderColor: grey[400],
              }}
            >
              <div className="w-4/5 flex justify-between">
                <div>反映時間</div>
                <div>反映時間間隔 / 作用時間</div>
                <div>設定パラメータ</div>
              </div>
            </div>
            <List>
              {paramList.map((param, index) => {
                return (
                  <ListItem key={index}>
                    <div className="w-full flex justify-between">
                      <div className="w-4/5 flex justify-between">
                        <div className="font-black">10:00〜12:00</div>
                        <div>1分 / 1分</div>
                        <div>気温20℃</div>
                      </div>
                      <MoreVertIcon />
                    </div>
                  </ListItem>
                );
              })}
            </List>
          </div>
        </>
      )}
    </div>
  );
}

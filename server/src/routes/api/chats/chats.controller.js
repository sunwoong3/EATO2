import asyncHandler from "express-async-handler";
import { Chats, Users, Documents, Notifications } from "#src/models/index.js";

//채팅목록 받아오기
//채팅방 입장
//채팅 보내기
//채팅 참여 우저 목록 가져오기
//채팅 나가기
//알림이랑 연동?
//강퇴 => 나이트메어

const controller = {
  chatList: asyncHandler(async (req, res) => {
    // 채팅방 목록
    res.status(200).json({});
  }),

  enterChat: asyncHandler(async (req, res) => {
    // 채팅방 입장
    res.status(200).json({});
  }),

  leaveChat: asyncHandler(async (req, res) => {
    // 채팅방 나가기
  }),
};

export default controller;

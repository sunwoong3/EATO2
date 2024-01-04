import asyncHandler from "express-async-handler";
import { User } from "#src/models/index.js";
import { oAuth, tokens } from "#src/utils/auth/index.js";
import { decryptPwd } from "#src/utils/crypto.js";

const controller = {};

// 유저 프로필 수정(닉네임, 지역) // 수정해야될수도 nickname location 조건 따로 나누기
// PATCH
// user/userInfo
controller.get = asyncHandler(async (req, res) => {
  const { nickname, location } = req.body;
  const toekn = generateAccessToken(req.user._id);
  const cookie = sendAccessToken(res, toekn);
  if (nickname && location) {
    await User.findByIdAndUpdate(
      req.user._id,
      { nickname: nickname, location: location },
      {
        new: true,
      }
    );
    res.status(200).json({
      message: "프로필 업데이트가 완료 되었습니다.",
      cookie,
    });
  } else {
    res.status(400).json({
      message: "닉네임 또는 지역을 작성해 주세요.",
    });
  }
});

controller.updateProfile = asyncHandler(async (req, res) => {
  const { nickname, location } = req.body;
  const toekn = generateAccessToken(req.user._id);
  const cookie = sendAccessToken(res, toekn);
  if (nickname && location) {
    await User.findByIdAndUpdate(
      req.user._id,
      { nickname: nickname, location: location },
      {
        new: true,
      }
    );
    res.status(200).json({
      message: "프로필 업데이트가 완료 되었습니다.",
      cookie,
    });
  } else {
    res.status(400).json({
      message: "닉네임 또는 지역을 작성해 주세요.",
    });
  }
});

// 회원 탈퇴
// DELETE
// user/userInfo
controller.deleteUser = asyncHandler(async (req, res) => {
  // 유저 본인이 탈퇴 요청
  const user = await User.findById(req.user._id);
  if (user.profile.email) {
    await User.updateOne(
      { _id: req.user._id },
      {
        $unset: { "profile.password": 1 },
      },
      {
        upsert: true,
      }
    );
    res.status(200).json({ message: "회원탈퇴가 완료 되었습니다." });
    return;
  }
  const { naver, kakao } = user;
  const kana = naver.uuid ? "naver" : kakao.uuid ? "kakao" : null;

  const options = oAuth.getOption(kana, `${user[kana].refreshToken}`);
  const token = await oAuth.updateAccessToken(options, "refresh_token");
  const { access_token } = token;

  // 엑세스 끊기
  const revokeRes = await oAuth.revokeAccess(corp, access_token);
  let message;

  if (revokeRes.data.id && kana === "kakao") {
    message = "카카오 계정과 연결 끊기 완료";
  }
  if (revokeRes.data.result === "success" && kana === "naver") {
    message = "네이버 계정과 연결 끊기 완료";
  }
  await User.updateOne(
    { _id: req.user._id },
    {
      $unset: {
        [`${kana}.accessToken`]: 1,
        [`${kana}.refreshToken`]: 1,
      },
    },
    // Upsert - 특정한 옵션을 주어서 수정할 대상이 없는 경우 insert 동작을 수행하도록 할 수 있습니다
    // Upsert 기능을 하려면 update, updateOne, updateMany, replaceOne 메소드에 옵션으로 { upsert: true } 를 주면 됩니다.
    // 또는 findAndModify, findOneAndUpdate, findOneAndReplace 메소드에 upsert: true를 추가할 수도 있습니다.
    { upsert: true }
  );
  res.status(200).json(message);
});

export default controller;

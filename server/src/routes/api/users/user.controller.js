import asyncHandler from "express-async-handler";
import { User } from "#src/models/index.js";
import { oAuth, tokens } from "#src/routes/middleware/support/index.js";
import { decryptPwd } from "#src/utils/crypto.js";

const controller = {};

// 회원가입
controller.createUser = asyncHandler(async (req, res) => {
  const { email, phone, name, location, password, nickname } = req.body;
  if (!email || !phone || !name || !location || !password || !nickname)
    throw new Error("모든 항목을 입력해 주세요.");

  const isEmail = await User.findOne({ email });
  const isNickName = await User.findOne({ nickname });
  const isPhone = await User.findOne({ phone });

  if (isEmail !== null) throw new Error("중복된 이메일이 존재합니다.");
  if (isNickName !== null) throw new Error("중복된 닉네임이 존재합니다.");
  if (isPhone !== null) throw new Error("중복된 휴대폰 번호가 존재합니다.");

  const decrypt = decryptPwd(password);

  const user = await User.create({
    email,
    phone,
    name,
    location,
    password: decrypt,
    nickname,
  });

  if (!user) throw new Error("회원가입에 실패했습니다.");

  res.status(200).send({ result: "success" });
});

// 로그인
controller.userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) throw new Error("모든 항목을 입력해 주세요");
  const user = await User.findOne({ email });
  const isPassword = await user.matchPassword(password, user.password);

  if (!user) throw new Error("존재하지 않는 유저입니다.");
  if (!isPassword) throw new Error("비밀번호를 확인해주세요.");

  const token = tokens.generateToken(email);

  res.status(200).send({ result: "success", token });
});

// 로그아웃
// GET
// user/logout
controller.logout = asyncHandler(async (req, res) => {
  res.clearCookie();
  res.status(200).send("로그아웃에 성공했습니다.");
});

// 소셜 로그인
// GET
// user/:kana
controller.socialLogin = asyncHandler(async (req, res) => {
  const { kana } = req.params;
  const { code } = req.query; // ?

  const options = oAuth.getOption(kana, code);
  const token = await tokens.generateToken(options, "authorization_code");
  const userInfo = await oAuth.getUserInfo(kana, options.userInfo_url, token);

  let uuid;
  let email;
  let nickname;

  if (kana === "kakao") {
    uuid = userInfo.id;
    email = userInfo.kakao_account.email;
    nickname = userInfo.kakao_account.profile.nickname;
  }
  if (kana === "naver") {
    uuid = userInfo.response.id;
    email = userInfo.response.email;
    nickname = userInfo.response.nickname;
  }
  // DB와 연락하기
  const { access_token, refresh_token } = token;
  const cookie = sendAccessToken(res, access_token);
  const user = await User.findOneAndUpdate(
    {
      [`${kana}.uuid`]: uuid,
    },
    {
      [`${kana}.email`]: email,
      [`${kana}.accessToken`]: access_token,
      [`${kana}.refreshToken`]: refresh_token,
    },
    { new: true }
  );

  if (user) {
    res.json({
      _id: user._id,
      nickname: user.nickname,
      cookie,
    });
  } else {
    const newUser = new User({
      [`${kana}.uuid`]: uuid,
      [`${kana}.email`]: email,
      [`${kana}.accessToken`]: access_token,
      [`${kana}.refreshToken`]: refresh_token,
      nickname,
    });

    await newUser.save();
    res.json({
      _id: newUser._id,
      nickname: newUser.nickname,
      cookie,
    });
  }
});

// 유저 프로필 수정(닉네임, 지역) // 수정해야될수도 nickname location 조건 따로 나누기
// PATCH
// user/userInfo
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

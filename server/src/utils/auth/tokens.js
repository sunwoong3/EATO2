import jwt from "jsonwebtoken";

// 토큰 생성
const generateToken = (email) => {
  return jwt.sign({ email }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1d",
  });
};

// 유효한 토큰인지 검증
const verifyToken = (token) => {
  try {
    const decoded = verify(token, process.env.JWT_SECRET_KEY);
    return decoded;
  } catch (err) {
    return null;
  }
};

// 토큰 해독
const isAuthorized = (req) => {
  const { authorization } = req.headers;

  if (authorization && authorization.startsWith("Bearer")) {
    const token = authorization.split(" ")[1];
    try {
      return jwt.verify(token, process.env.JWT_SECRET_KEY);
    } catch (err) {
      return null;
    }
  }
  return null;
};

// 토큰 전달
const sendAccessToken = (res, accessToken) => {
  res.cookie("jwt", accessToken, {
    sameSite: "none",
    httpOnly: true,
    secure: true,
  });
  res.status(200).json({ message: "ok" });
};

export { generateToken, verifyToken, isAuthorized, sendAccessToken };

import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "pages/Landing";
import SignIn from "pages/SignInPage";
import SignUp from "pages/SignUpPage";
import MyPage from "pages/MyPage";
import Home from "pages/Home";
import Map from "pages/Map";
import ChatRoom from "pages/ChatRoom";
import RedirectKakao from "components/OAuth/RedirectKakao";
import RedirectNaver from "components/OAuth/RedirectNaver";
import { socket } from "./socket";

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);

  const onConnect = () => {
    console.log("success connect");
    setIsConnected(true);
  };
  const onDisconnect = () => {
    console.log("disconnected");
    setIsConnected(false);
  };
  const socketError = (error) => {
    console.log(`ERROR: ${error}`);
  };

  useEffect(() => {
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.io.on("error", socketError);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing isConnected={isConnected} />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/kakao" element={<RedirectKakao />} />
        <Route path="/naver" element={<RedirectNaver />} />
        <Route path="/map" element={<Map />} />
        <Route path="/chatroom" element={<ChatRoom />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

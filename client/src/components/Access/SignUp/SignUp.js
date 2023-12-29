import React, { useState } from "react";
import Logo from "images/logo-signup.png";
import ForkW from "images/fork_white.png";
import ForkR from "images/fork_red.png";
import SocialLogBtn from "./SocialLogBtn";
import api from "api";

function SignUp() {
  const [user, setUser] = useState({});

  const handleClcikSignup = async () => {
    await api.users.signUp(user);
  };

  const handleChangeUpdateUser = async (key, value) => {
    console.log({ key });
    console.log({ value });
    const newInfo = {};
    newInfo[key] = value;

    const info = Object.assign(user, newInfo);
    setUser(info);
  };

  return (
    <main className="signin-up-wrapper">
      {/* 재사용 가능한 Left Page의 클래스명은 signin-up-left로 명명해놨음 */}
      <section className="signin-up-left">
        <div className="text-box">
          <h1 className="welcome">welcome</h1>
          <h1 className="welcome">EAt TOgether!</h1>
          <img src={Logo} className="left-logo" alt="logo"></img>
        </div>
        <div className="fork-box">
          <img src={ForkW} className="left-fork" alt="fork-img"></img>
        </div>
      </section>

      {/* Right Page */}
      <section className="signup-right">
        <img src={ForkR} className="right-fork" alt="fork-img" />

        <div className="signup-box">
          <div className="signup-title-text">회원가입</div>

          {/* Input 컨테이너 */}
          <div className="signup-input-container">
            {/* 이메일 */}
            <article className="signup-input-box">
              <p className="signup-input-title">이메일 주소</p>
              <input
                className="signup-input"
                type="email"
                placeholder="예) eato@gmail.com"
                onChange={(e) =>
                  handleChangeUpdateUser("email", e.target.value)
                }
              ></input>
              <hr color="#DADADA" />
            </article>

            {/* 닉네임 */}
            <article className="signup-input-box">
              <p className="signup-input-title">닉네임</p>
              <input
                className="signup-input"
                type="text"
                minLength="1"
                maxLength="6"
                placeholder="영문 또는 한글 1-6자"
                onChange={(e) =>
                  handleChangeUpdateUser("nickname", e.target.value)
                }
              ></input>
              <hr color="#DADADA" />
            </article>

            {/* 비밀번호 */}
            <article className="signup-input-box">
              <p className="signup-input-title">비밀번호</p>
              <input
                className="signup-input"
                type="password"
                minLength="8"
                maxLength="16"
                placeholder="영문, 숫자, 특수문자 조합 8-16자"
                onChange={(e) =>
                  handleChangeUpdateUser("password", e.target.value)
                }
              ></input>
              <hr color="#DADADA" />
            </article>

            {/* 비밀번호 확인*/}
            <article className="signup-input-box">
              <p className="signup-input-title">비밀번호 확인</p>
              <input
                className="signup-input"
                type="password"
                minLength="8"
                maxLength="16"
                placeholder="영문, 숫자, 특수문자 조합 8-16자"
              ></input>
              <hr color="#DADADA" />
            </article>
          </div>

          {/* 소셜 로그인 컨테이너 */}
          <article className="signup-social-container">
            <div className="signup-btn" onClick={() => handleClcikSignup()}>
              가입하기
            </div>
            {/* <SocialLogBtn /> */}
          </article>
        </div>
      </section>
    </main>
  );
}
export default SignUp;

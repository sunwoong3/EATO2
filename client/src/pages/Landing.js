import React from "react";
import Nav from "components/Nav/Nav";
import Intro from "components/Landing/Intro";
import Footer from "components/Footer/Footer";

function Landing({ isConnected }) {
  console.log(isConnected);
  return (
    <>
      <Nav></Nav>
      <Intro></Intro>
      <Footer></Footer>
    </>
  );
}

export default Landing;

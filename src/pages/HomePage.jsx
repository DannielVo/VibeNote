import React, { useEffect } from "react";
import Header from "../components/Header/Header";

const HomePage = ({ children }) => {
  useEffect(() => {
    document.title = "VibeN | Home";
  }, []);

  return (
    <>
      <Header></Header>
      <main>{children}</main>
    </>
  );
};

export default HomePage;

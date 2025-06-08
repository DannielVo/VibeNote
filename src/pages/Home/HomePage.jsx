import React, { useEffect } from "react";
import "./homePage.css";
import Header from "../../components/Header/Header";
import NoteSettings from "../../components/NoteSettings/NoteSettings";
import ToolBarSection from "./ToolBarSection/ToolBarSection";
import NoteSection from "./NoteSection/NoteSection";
import API from "../../hooks/api";

const HomePage = () => {
  useEffect(() => {
    document.title = "VibeN | Home";
  }, []);

  return (
    <>
      <Header></Header>
      <main>
        <NoteSettings></NoteSettings>
        <ToolBarSection></ToolBarSection>
        <NoteSection title={"Pinned"} type={"pin"}></NoteSection>
        <NoteSection title={"Others"} type={"others"}></NoteSection>
        <NoteSection title={"Share to you"} type={"share"}></NoteSection>
      </main>

      {/* <!-- ACTIVATE NOTIFICATION --> */}
      <div id="verification-popup" className="popup-warning">
        <p>Your account is unverified!</p>
        <a href="#" id="verify-link">
          Verify now
        </a>
      </div>
    </>
  );
};

export default HomePage;

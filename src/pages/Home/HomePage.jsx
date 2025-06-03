import React, { useEffect } from "react";
import "./homePage.css";
import Header from "../../components/Header/Header";
import NoteSettings from "../../components/NoteSettings/NoteSettings";
import ToolBarSection from "./ToolBarSection/ToolBarSection";
import NoteSection from "./NoteSection/NoteSection";

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
        <NoteSection title={"Pinned"}></NoteSection>
        <NoteSection title={"Others"}></NoteSection>
        <NoteSection title={"Share to you"}></NoteSection>
      </main>

      {/* <!-- ACTIVATE NOTIFICATION --> */}
      <div id="verification-popup" class="popup-warning">
        <p>Your account is unverified!</p>
        <a href="#" id="verify-link">
          Verify now
        </a>
      </div>
    </>
  );
};

export default HomePage;

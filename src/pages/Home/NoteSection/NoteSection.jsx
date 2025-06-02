import React from "react";
import "./noteSection.css";
import NoteItem from "../../../components/NoteItem/NoteItem";

const NoteSection = () => {
  return (
    <section className="note-section">
      <h2 className="section-title">Pinned</h2>
      <div className="note-list pinned-notes list-view">
        <NoteItem></NoteItem>
        <NoteItem></NoteItem>
        <NoteItem></NoteItem>
        <NoteItem></NoteItem>
      </div>
    </section>
  );
};

export default NoteSection;

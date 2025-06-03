import React from "react";
import "./noteSection.css";
import NoteItem from "../../../components/NoteItem/NoteItem";
import { useNote } from "../../../context/NoteContext";

const NoteSection = ({ title }) => {
  const { isGridView } = useNote();
  return (
    <section className="note-section">
      <h2 className="section-title">{title}</h2>
      <div
        className={`note-list pinned-notes ${isGridView ? "" : "list-view"} `}
      >
        <NoteItem></NoteItem>
        <NoteItem></NoteItem>
        <NoteItem></NoteItem>
        <NoteItem></NoteItem>
      </div>
    </section>
  );
};

export default NoteSection;

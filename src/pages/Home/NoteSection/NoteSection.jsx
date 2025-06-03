import React from "react";
import "./noteSection.css";
import NoteItem from "../../../components/NoteItem/NoteItem";
import { useNote } from "../../../context/NoteContext";
import { NOTES } from "../../../assets/assets";

const NoteSection = ({ title }) => {
  const { isGridView } = useNote();
  return (
    <section className="note-section">
      <h2 className="section-title">{title}</h2>
      <div
        className={`note-list pinned-notes ${isGridView ? "" : "list-view"} `}
      >
        {NOTES.map((item, index) => (
          <NoteItem key={`note ${index}`} noteItem={item}></NoteItem>
        ))}
      </div>
    </section>
  );
};

export default NoteSection;

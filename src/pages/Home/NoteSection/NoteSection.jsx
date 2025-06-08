import React, { useEffect, useState } from "react";
import "./noteSection.css";
import NoteItem from "../../../components/NoteItem/NoteItem";
import { useNote } from "../../../context/NoteContext";
import { NOTES } from "../../../assets/assets";

const NoteSection = ({ title, type }) => {
  const {
    isGridView,
    notes,
    noteSearchTerm,
    labelFilterTerms,
    isSortingLastModified,
    isLoadingData,
    setIsLoadingData,
    loadDataError,
  } = useNote();
  const [filteredNotes, setFilteredNotes] = useState([]);

  useEffect(() => {
    setIsLoadingData(true);

    const timer = setTimeout(() => {
      const result = notes
        .filter((item) => {
          const matchesSearch =
            noteSearchTerm === "" ||
            item.noteTitle
              .toLowerCase()
              .includes(noteSearchTerm.toLowerCase()) ||
            item.noteContent
              .toLowerCase()
              .includes(noteSearchTerm.toLowerCase());

          const matchesType = type === "pin" ? item.isPinned : !item.isPinned;

          const matchesLabel =
            labelFilterTerms.length === 0
              ? true
              : Array.isArray(item.labels) &&
                labelFilterTerms.every((filterLabel) =>
                  item.labels.some(
                    (label) => label.labelName === filterLabel.labelName
                  )
                );

          return (
            matchesSearch && matchesType && matchesLabel && type !== "share"
          );
        })
        .sort((a, b) => {
          if (type === "pin") {
            const pinnedA = new Date(a.pinnedAt);
            const pinnedB = new Date(b.pinnedAt);
            return pinnedB - pinnedA;
          }

          const dateA = new Date(
            isSortingLastModified ? a.updated_at : a.created_at
          );
          const dateB = new Date(
            isSortingLastModified ? b.updated_at : b.created_at
          );
          return dateB - dateA; // newest first
        });

      setFilteredNotes(result);
      setIsLoadingData(false);
    }, 300); // delay nhỏ để user thấy loading, tùy chỉnh nếu muốn

    return () => clearTimeout(timer); // clear nếu dependencies thay đổi nhanh
  }, [notes, noteSearchTerm, type, isSortingLastModified, labelFilterTerms]);

  return (
    <section className="note-section">
      <div className="note-section-header">
        <h2 className="section-title">{title}</h2>
        {isLoadingData && <div className="note-section-spinner"></div>}
      </div>

      {loadDataError !== "" ? (
        <p>{loadDataError}</p>
      ) : (
        <div
          className={`note-list pinned-notes ${isGridView ? "" : "list-view"} `}
        >
          {filteredNotes.map((item, index) => (
            <NoteItem key={`note ${index}`} noteItem={item}></NoteItem>
          ))}
        </div>
      )}
    </section>
  );
};

export default NoteSection;

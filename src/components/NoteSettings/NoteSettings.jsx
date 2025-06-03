import React, { useEffect, useRef, useState } from "react";
import "./noteSettings.css";
import { COLOR, TAGS } from "../../assets/assets";

const NoteSettings = () => {
  const [isExpandedNoteOpen, setIsExpandedNoteOpen] = useState(false);
  const noteContainerRef = useRef(null);
  const expandedNoteRef = useRef(null);
  const addPinIcon = useRef(null);
  const [isColorPanelOpen, setIsColorPanelOpen] = useState(false);
  const [isFontSizePanelOpen, setIsFontSizePanelOpen] = useState(false);
  const [isAddTagPanelOpen, setIsAddTagPanelOpen] = useState(false);

  const toggleAddTagPanel = () => {
    setIsAddTagPanelOpen((prev) => !prev);
  };

  const toggleFontSizePanel = () => {
    setIsFontSizePanelOpen((prev) => !prev);
  };

  const toggleColorPanel = () => {
    setIsColorPanelOpen((prev) => !prev);
  };

  const toggleExpandedNote = (e) => {
    e.preventDefault();
    setIsColorPanelOpen(false);
    setIsFontSizePanelOpen(false);
    setIsAddTagPanelOpen(false);
    setIsExpandedNoteOpen((prev) => !prev);
  };

  const togglePinIcon = () => {
    if (addPinIcon.current) {
      addPinIcon.current.classList.toggle("pinned");
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        isExpandedNoteOpen &&
        expandedNoteRef.current &&
        !expandedNoteRef.current.contains(e.target)
      ) {
        setIsExpandedNoteOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isExpandedNoteOpen]);

  return (
    <>
      <div className="note-container" id="noteContainer" ref={noteContainerRef}>
        {!isExpandedNoteOpen && (
          <div
            className="add-note-bar"
            id="collapsedNote"
            onClick={toggleExpandedNote}
          >
            <input type="text" placeholder="Add note..." readOnly />
          </div>
        )}

        {/* <!-- Expanded Note Form --> */}
        {isExpandedNoteOpen && (
          <div
            className="expanded-note"
            id="expandedNote"
            ref={expandedNoteRef}
          >
            <input type="text" placeholder="Title" className="note-title" />
            <textarea
              placeholder="Your note content..."
              className="note-content"
            ></textarea>

            {/* <!-- Bảng chọn màu --> */}
            {isColorPanelOpen && (
              <div className="color-palette" id="colorPalette">
                {/* <!-- Icon bỏ chọn màu --> */}
                <div className="color-option no-color selected" data-color="">
                  <i className="bx bx-eraser"></i>
                </div>
                {/* <!-- Các màu khác --> */}
                {COLOR.map((item, index) => (
                  <div
                    key={`color ${index}`}
                    className="color-option"
                    style={{ backgroundColor: item.color }}
                    data-color={item.color}
                  ></div>
                ))}
              </div>
            )}

            {/* Panel chọn size */}
            {isFontSizePanelOpen && (
              <div className="font-size-options" id="fontSizeOptions">
                <div className="size-option" data-size="14px">
                  Small
                </div>
                <div className="size-option" data-size="16px">
                  Medium
                </div>
                <div className="size-option" data-size="18px">
                  Large
                </div>
                <div className="size-option" data-size="20px">
                  Extra
                </div>
              </div>
            )}

            {/* <!-- Popup chọn tag --> */}
            {isAddTagPanelOpen && (
              <div className="add-tag-popup" id="addTagPopup">
                <div className="addTag-popup-header">Select Tags</div>
                <div className="addTag-list" id="tagList">
                  {TAGS.map((item, index) => (
                    <div
                      key={`tag ${index}`}
                      className="tag-item"
                      data-tag="Work"
                    >
                      {item.labelName}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="note-icons">
              <i
                className="bx bx-pin addPinIcon"
                title="Pin note"
                id="addPinIcon"
                ref={addPinIcon}
                onClick={togglePinIcon}
              ></i>
              <i
                className="bx bx-tag-alt"
                title="Add tags"
                id="addTagIcon"
                onClick={toggleAddTagPanel}
              ></i>
              <i
                className="bx bx-palette"
                id="paletteIcon"
                title="Change color"
                onClick={toggleColorPanel}
              ></i>
              <i
                className="bx bx-text-height"
                title="Change font size"
                onClick={toggleFontSizePanel}
              ></i>
              <i className="bx bx-user-plus" title="Share note"></i>
              <i className="bx bx-lock" title="Lock note"></i>
              <button className="close-btn" onClick={toggleExpandedNote}>
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default NoteSettings;

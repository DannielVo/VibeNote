import React, { useEffect, useRef, useState } from "react";
import "./noteSettings.css";
import { COLOR, TAGS } from "../../assets/assets";

const NoteSettings = () => {
  const [isExpandedNoteOpen, setIsExpandedNoteOpen] = useState(false);
  const noteContainerRef = useRef(null);
  const expandedNoteRef = useRef(null);
  const addPinIcon = useRef(null);

  const toggleExpandedNote = (e) => {
    e.preventDefault();
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
        noteContainerRef.current &&
        expandedNoteRef.current &&
        !noteContainerRef.current.contains(e.target) &&
        !expandedNoteRef.current.contains(e.target)
      ) {
        setIsExpandedNoteOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="note-container" id="noteContainer" ref={noteContainerRef}>
        {!isExpandedNoteOpen && (
          <div
            className="add-note-bar"
            id="collapsedNote"
            onClick={(e) => toggleExpandedNote(e)}
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

            {/* <!-- Popup chọn tag --> */}
            <div className="add-tag-popup" id="addTagPopup">
              <div className="addTag-popup-header">Select Tags</div>
              <div className="addTag-list" id="tagList">
                {TAGS.map((item, index) => (
                  <div
                    key={`tag ${index}`}
                    className="tag-item"
                    data-tag="Work"
                  >
                    {item.tagName}
                  </div>
                ))}
              </div>
            </div>

            <div className="note-icons">
              <i
                className="bx bx-pin addPinIcon"
                title="Pin note"
                id="addPinIcon"
                ref={addPinIcon}
                onClick={togglePinIcon}
              ></i>
              <i className="bx bx-tag-alt" title="Add tags" id="addTagIcon"></i>
              <i
                className="bx bx-palette"
                id="paletteIcon"
                title="Change color"
              ></i>
              <i className="bx bx-text-height" title="Change font size"></i>
              <i className="bx bx-user-plus" title="Share note"></i>
              <i className="bx bx-lock" title="Lock note"></i>
              <button
                className="close-btn"
                onClick={(e) => toggleExpandedNote(e)}
              >
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

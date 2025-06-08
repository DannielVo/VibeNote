import React, { useEffect, useRef, useState } from "react";
import "./noteSettings.css";
import { COLOR, FONT_SIZE, TAGS } from "../../assets/assets";
import { useNote } from "../../context/NoteContext";
import NotePasswordModal from "../NotePasswordModal/NotePasswordModal";

const NoteSettings = () => {
  const { labels, addNote, updateNote, selectedNoteItem } = useNote();

  const [isExpandedNoteOpen, setIsExpandedNoteOpen] = useState(false);
  const noteContainerRef = useRef(null);
  const expandedNoteRef = useRef(null);
  const [isColorPanelOpen, setIsColorPanelOpen] = useState(false);
  const [isFontSizePanelOpen, setIsFontSizePanelOpen] = useState(false);
  const [isAddTagPanelOpen, setIsAddTagPanelOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  const initialState = {
    id: null,
    noteTitle: "",
    noteContent: "",
    isPinned: false,
    isLocked: false,
    notePassword: "",
    color: "",
    fontSize: "",
    labels: [],
  };
  const [note, setNote] = useState(initialState);
  const [noteBgColor, setNoteBgColor] = useState("");
  const [noteFontSize, setNoteFontSize] = useState("");
  const [tags, setTags] = useState([]);

  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    action: "", // "set", "enter", or "change"
    noteItem: null,
    onSuccess: () => {},
    onCancel: () => {},
  });

  const openPasswordModal = (action) => {
    setIsPasswordModalOpen(true);
    return new Promise((resolve, reject) => {
      setModalConfig({
        isOpen: true,
        action: action, // "set" | "enter" | "change"
        noteItem: note, // note hiện tại
        onSuccess: (password) => {
          resolve(password);
          closePasswordModal();
        },
        onCancel: () => {
          reject("cancel");
          closePasswordModal();
        },
      });
    });
  };

  const closePasswordModal = () => {
    setIsPasswordModalOpen(false);
    setModalConfig((prev) => ({ ...prev, isOpen: false }));
  };

  const handlePickColor = (color) => {
    setNoteBgColor(color);
    setNote({ ...note, color: color });
  };

  const handlePickFont = (fontSize) => {
    setNoteFontSize(fontSize);
    setNote({ ...note, fontSize: fontSize });
  };

  const handleTagClick = (item) => {
    const isTagAlreadySelected = tags.some((tag) => tag.id === item.id);
    if (isTagAlreadySelected) {
      setTags(tags.filter((tag) => tag.id !== item.id));
    } else {
      setTags([...tags, item]);
    }
  };

  const handleSubmit = async () => {
    if (note.id === null) {
      //Add
      try {
        if (note.noteTitle === "") {
          return;
        }

        setLoading(true);

        const labelIds = tags.map((tag) => tag.id);
        const newNote = await addNote(note, labelIds);

        setNote((prev) => ({
          ...prev,
          id: newNote.id,
        }));

        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        alert("Something went wrong. Please try again later!");
      }
    } else {
      //Edit
      try {
        if (note.noteTitle === "") {
          return;
        }
        setLoading(true);
        const labelIds = tags.map((tag) => tag.id);
        await updateNote(note.id, note, labelIds);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        alert("Something went wrong. Please try again later!");
      }
    }
  };

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
    setIsExpandedNoteOpen((prev) => !prev);
    resetData();
  };

  const togglePinIcon = () => {
    setNote({ ...note, isPinned: !note.isPinned });
  };

  const toggleLockIcon = async () => {
    try {
      const password = await openPasswordModal(note.isLocked ? "enter" : "set");

      if (note.isLocked) {
        // Unlocked successfully
        setNote({ ...note, isLocked: false });
      } else {
        // Set password successfully
        setNote({ ...note, isLocked: true, notePassword: password }); // lưu password nếu cần
      }
    } catch (e) {
      console.log("User cancelled or failed password", e);
    }
  };

  const changeLockPassword = async () => {
    try {
      const password = await openPasswordModal("change");
      setNote({ ...note, isLocked: true, notePassword: password });
    } catch (error) {
      console.log("User cancelled or failed password", e);
    }
  };

  const resetData = () => {
    setNoteBgColor("");
    setNoteFontSize("");
    setTags([]);

    setNote(initialState);

    setIsColorPanelOpen(false);
    setIsFontSizePanelOpen(false);
    setIsAddTagPanelOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = async (e) => {
      if (
        isExpandedNoteOpen &&
        !isPasswordModalOpen &&
        expandedNoteRef.current &&
        !expandedNoteRef.current.contains(e.target)
      ) {
        setIsExpandedNoteOpen(false);
        resetData();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isExpandedNoteOpen, isPasswordModalOpen]);

  // Autosave after 3s not working
  useEffect(() => {
    if (!isExpandedNoteOpen) return; // Chỉ autosave khi note đang mở

    const timeoutId = setTimeout(() => {
      handleSubmit();
    }, 5000);

    return () => clearTimeout(timeoutId);
  }, [note, isExpandedNoteOpen]);

  // Set labels
  useEffect(() => {
    if (note?.labels?.length > 0) {
      setTags(note.labels);
    }
  }, [note]);

  // Load EditMode
  useEffect(() => {
    if (selectedNoteItem !== null && isExpandedNoteOpen === false) {
      setIsExpandedNoteOpen(true);
      setNote(selectedNoteItem);
      setTags(selectedNoteItem.labels);
      setNoteBgColor(selectedNoteItem.color);
      setNoteFontSize(selectedNoteItem.fontSize);
    }
  }, [selectedNoteItem]);

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
            style={noteBgColor ? { backgroundColor: noteBgColor } : undefined}
            ref={expandedNoteRef}
          >
            <input
              type="text"
              placeholder="Title"
              className="note-title"
              value={note.noteTitle}
              style={noteBgColor ? { backgroundColor: noteBgColor } : undefined}
              onChange={(e) => setNote({ ...note, noteTitle: e.target.value })}
            />
            <textarea
              placeholder="Your note content..."
              className="note-content"
              value={note.noteContent}
              style={{
                ...(noteBgColor ? { backgroundColor: noteBgColor } : {}),
                ...(noteFontSize ? { fontSize: noteFontSize } : {}),
              }}
              onChange={(e) =>
                setNote({ ...note, noteContent: e.target.value })
              }
            ></textarea>

            {/* <!-- Bảng chọn màu --> */}
            {isColorPanelOpen && (
              <div className="color-palette" id="colorPalette">
                {/* <!-- Icon bỏ chọn màu --> */}
                <div
                  className="color-option no-color selected"
                  data-color=""
                  onClick={() => handlePickColor("")}
                >
                  <i className="bx bx-eraser"></i>
                </div>
                {/* <!-- Các màu khác --> */}
                {COLOR.map((item, index) => (
                  <div
                    key={`color ${index}`}
                    className={`color-option ${
                      noteBgColor === item.color ? "selected" : ""
                    }`}
                    style={{ backgroundColor: item.color }}
                    data-color={item.color}
                    onClick={() => handlePickColor(item.color)}
                  ></div>
                ))}
              </div>
            )}

            {/* Panel chọn size */}
            {isFontSizePanelOpen && (
              <div className="font-size-options" id="fontSizeOptions">
                {FONT_SIZE.map((item, index) => (
                  <div
                    className="size-option"
                    data-size={item.value}
                    key={`fontsize ${index}`}
                    onClick={() => handlePickFont(item.value)}
                  >
                    {item.name}
                  </div>
                ))}
              </div>
            )}

            {/* <!-- Popup chọn tag --> */}
            {isAddTagPanelOpen && (
              <div className="add-tag-popup" id="addTagPopup">
                <div className="addTag-popup-header">Select Tags</div>
                <div className="addTag-list" id="tagList">
                  {labels.map((item, index) => (
                    <div
                      key={`tag-${index}`}
                      className={`tag-item ${
                        tags.some((tag) => tag.id === item.id) ? "selected" : ""
                      }`}
                      data-tag={item.labelName}
                      onClick={() => handleTagClick(item)}
                    >
                      {item.labelName}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="note-icons">
              <div className="note-prop-tools">
                <i
                  className={`bx bx-pin addPinIcon ${
                    note.isPinned ? "pinned" : ""
                  }`}
                  title="Pin note"
                  id="addPinIcon"
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
                <i
                  className={`bx ${
                    note.isLocked == true ? "bx-lock-open-alt" : "bx-lock"
                  }`}
                  title={`${
                    note.isLocked == true ? "Unlock note" : "Lock note"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleLockIcon();
                  }}
                ></i>
                {note.isLocked == true && (
                  <i
                    className="bx bx-key"
                    title="Change note password"
                    onClick={changeLockPassword}
                  ></i>
                )}
              </div>
              <div className="note-actions">
                {loading && <div className="spinner"></div>}
                <button className="close-btn" onClick={toggleExpandedNote}>
                  Close
                </button>
                <button className="submit-btn" onClick={handleSubmit}>
                  {loading ? "Saving..." : "Save"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <NotePasswordModal
        isOpen={modalConfig.isOpen}
        onClose={modalConfig.onCancel}
        noteItem={modalConfig.noteItem}
        action={modalConfig.action}
        onSuccess={modalConfig.onSuccess}
        onCancel={modalConfig.onCancel}
      />
    </>
  );
};

export default NoteSettings;

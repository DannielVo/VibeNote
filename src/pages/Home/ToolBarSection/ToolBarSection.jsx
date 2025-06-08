import React, { useState } from "react";
import "./toolBarSection.css";
import { useNote } from "../../../context/NoteContext";
import DeleteConfirmModal from "../../../components/DeleteConfirmModal/DeleteConfirmModal";
import EditTagModal from "../../../components/EditTagModal/EditTagModal";
import { TAGS } from "../../../assets/assets";

const ToolBarSection = () => {
  const {
    toggleGridListView,
    isGridView,
    labels,
    addLabel,
    labelFilterTerms,
    setLabelFilterTerms,
    setIsSortingLastModified,
  } = useNote();

  const [isTagAreaOpen, setIsTagAreaOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditTagModalOpen, setIsEditTagModalOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState({});

  const [loading, setLoading] = useState(false);
  const [tagItemName, setTagItemName] = useState("");

  const openEditModal = (selectedItem) => {
    setSelectedTag(selectedItem);
    setIsEditTagModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditTagModalOpen(false);
  };

  const openDeleteModal = (selectedItem) => {
    setSelectedTag(selectedItem);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const toggleTagArea = () => {
    setIsTagAreaOpen((prev) => !prev);
  };

  const handleAddTag = async () => {
    try {
      setLoading(true);
      await addLabel(tagItemName);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      alert("Something went wrong. Please try again later!");
    }
  };

  const filteredLabels = labels.filter((item) =>
    item.labelName.toLowerCase().includes(tagItemName.toLowerCase())
  );

  const handleTagClick = (item) => {
    const isSelected = labelFilterTerms.some(
      (label) => label.labelName === item.labelName
    );

    if (isSelected) {
      setLabelFilterTerms((prev) =>
        prev.filter((label) => label.labelName !== item.labelName)
      );
    } else {
      setLabelFilterTerms((prev) => [...prev, item]);
    }
  };

  const handleSelectSortType = (e) => {
    if (e.target.value === "modified") {
      setIsSortingLastModified(true);
    } else {
      setIsSortingLastModified(false);
    }
  };

  return (
    <>
      {/* <!-- Row 3: TAGS + VIEW + FILTER --> */}
      <div className="toolbar">
        <i className="bx bx-price-tag" title="Tags" onClick={toggleTagArea}></i>
        {isGridView ? (
          <i
            className="bx bx-grid icon-button"
            id="grid-view"
            title="Grid view"
            onClick={toggleGridListView}
          ></i>
        ) : (
          <i
            className="bx bx-list-ul icon-button"
            id="list-view"
            title="List view"
            onClick={toggleGridListView}
          ></i>
        )}

        <div className="filter-note-bar" title="Filter notes">
          <select id="note-filter" onChange={handleSelectSortType}>
            <option value="modified">Last modified</option>
            <option value="created">Last created</option>
          </select>
        </div>
      </div>

      {/* <!-- Row 4: TAG AREA --> */}
      {isTagAreaOpen && (
        <div className="tag-area">
          <div className="tag-input-bar">
            <input
              type="text"
              placeholder="Search/add tag..."
              value={tagItemName}
              onChange={(e) => setTagItemName(e.target.value)}
            />
            {loading && <div className="spinner"></div>}
            <i className="bx bx-search"></i>
            <i className="bx bx-plus" onClick={handleAddTag}></i>
            {/* <i className="bx bx-check-square"></i> */}
          </div>
          <div className="tag-list">
            {filteredLabels.map((item, index) => (
              <div
                className={`tag ${
                  labelFilterTerms.some(
                    (label) => label.labelName === item.labelName
                  )
                    ? "selected"
                    : ""
                }`}
                key={`tagItem ${index}`}
                onClick={() => handleTagClick(item)}
              >
                <i
                  className="bx bx-x deleteTag-icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    openDeleteModal(item);
                  }}
                ></i>
                <span>{item.labelName}</span>
                <i
                  className="bx bx-edit editTag-icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    openEditModal(item);
                  }}
                ></i>
              </div>
            ))}
          </div>
        </div>
      )}

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        itemType={"tag"}
        itemName={selectedTag.labelName}
        itemId={selectedTag.id}
      ></DeleteConfirmModal>

      <EditTagModal
        isOpen={isEditTagModalOpen}
        onClose={closeEditModal}
        tagItem={selectedTag}
      ></EditTagModal>

      {/* <!-- Row 5: DISPLAY TAGS --> */}
      {labelFilterTerms.length > 0 && (
        <div className="display-tags">
          <p>
            Tags: {labelFilterTerms.map((item) => item.labelName).join(", ")}
          </p>
        </div>
      )}
    </>
  );
};

export default ToolBarSection;

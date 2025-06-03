import React, { useState } from "react";
import "./toolBarSection.css";

const ToolBarSection = () => {
  const [isGridView, setIsGridView] = useState(true);
  const [isTagAreaOpen, setIsTagAreaOpen] = useState(false);

  const toggleGridListView = () => {
    setIsGridView((prev) => !prev);
  };

  const toggleTagArea = () => {
    setIsTagAreaOpen((prev) => !prev);
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
          <select id="note-filter">
            <option value="modified">Last modified</option>
            <option value="created">Last created</option>
          </select>
        </div>
      </div>

      {/* <!-- Row 4: TAG AREA --> */}
      {isTagAreaOpen && (
        <div className="tag-area">
          <div className="tag-input-bar">
            <input type="text" placeholder="Search/edit/add tag..." />
            <i className="bx bx-search"></i>
            <i className="bx bx-plus"></i>
            <i className="bx bx-check-square"></i>
          </div>
          <div className="tag-list">
            <div className="tag">
              <i className="bx bx-x deleteTag-icon"></i>
              <span>Work</span>
              <i className="bx bx-edit editTag-icon"></i>
            </div>
            <div className="tag">
              <i className="bx bx-x deleteTag-icon"></i>
              <span>Personal</span>
              <i className="bx bx-edit editTag-icon"></i>
            </div>
            <div className="tag">
              <i className="bx bx-x deleteTag-icon"></i>
              <span>Ideas</span>
              <i className="bx bx-edit editTag-icon"></i>
            </div>
            <div className="tag">
              <i className="bx bx-x deleteTag-icon"></i>
              <span>Project</span>
              <i className="bx bx-edit editTag-icon"></i>
            </div>
          </div>
        </div>
      )}

      {/* <!-- Row 5: DISPLAY TAGS --> */}
      <div className="display-tags">
        <p>Tags: work, personal, project</p>
      </div>
    </>
  );
};

export default ToolBarSection;

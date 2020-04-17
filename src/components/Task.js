import React from "react";

function Task() {
  return (
    <div className="card">
        <div className="card-header">
            <input type="text" placeholder="Sample Header"/>
            <span>Edit Button</span>
        </div>
        <div className="card-body">Simple content here</div>
        <div className="card-footer">Footer</div>
      </div>
  );
}

export default Task;
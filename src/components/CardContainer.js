import React from "react";
import Task from './Task'
import Droppable from './drag-and-drop/Dropable'
import Draggable from './drag-and-drop/Draggable'

function CardContainer() {
  return (
    <div className="card-container">
      <div className="card">
        <div className="card-header">Header Only</div>
      </div>
      {/* this will a dragable content */}
      <Task />
      {/* On click add card it will add one more draggable task */}
      <div className="card">
        <div className="card-header">Add Card +</div>
      </div>
      
    </div>
  );
}

export default CardContainer;

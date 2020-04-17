import React, { useState, useContext } from "react";
import Task from "./Task";
import { StateContext } from "./Wrapper";
import Droppable from "./drag-and-drop/Dropable";
import Draggable from "./drag-and-drop/Draggable";

function CardContainer(props) {
  const stateContext = useContext(StateContext);
  const [inputValue, setInputValue] = useState('');

  const handleCardHeaderChange = (e) => {
    setInputValue(e.target.value);
    console.log("called");
    stateContext.dispatch({
      type: "updateColumnHeader",
      value: { ...props.card, header: e.target.value },
    });
  };

  return (
    <div className="card-container">
      <div className="card">
        <div className="card-header">
          {inputValue}
        </div>
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

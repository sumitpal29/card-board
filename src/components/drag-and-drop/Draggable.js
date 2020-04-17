import React, { useContext } from "react";
import { StateContext } from "../Wrapper";

function Draggable(props) {
  const stateContext = useContext(StateContext);
  const drag = (e) => {
    const el = e.target;
    e.dataTransfer.setData("transfer", e.target.id);
    el.classList.add("hold");
    setTimeout(() => el.classList.add("invisible"), 0);
    if (e.target.getAttribute("type") === "column") {
      const index = stateContext.currentBoardState.innerChildren.findIndex(
        (el) => {
          if (el.id === e.target.id) {
            return true;
          }
          return false;
        }
      );
      e.dataTransfer.setData("index", index);
    }
  };

  const noAllowDrop = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const dragEnd = (e) => {
    const el = e.target;
    el.classList.remove("invisible");
    el.classList.remove("hold");
  };

  return (
    <div
      className={`draggable-el ${props.classRef || ""}`}
      id={props.card.id}
      type={props.card.type}
      draggable="true"
      onDragStart={drag}
      onDragOver={noAllowDrop}
      onDragEnd={dragEnd}
    >
      {props.children}
    </div>
  );
}

export default Draggable;

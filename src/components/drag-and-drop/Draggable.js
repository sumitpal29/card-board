import React, { useContext } from "react";
import { StateContext } from "../Wrapper";

function Draggable(props) {
   // console.log('rendered dragable component', props)
  const stateContext = useContext(StateContext);

  const drag = (e, columnIndex,taskIndex) => {
    const el = e.target;
    const type = e.target.getAttribute("type");
    el.classList.add("hold");
    
    e.dataTransfer.setData("transfer", e.target.id);
    e.dataTransfer.setData("target-type", type);

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

export default React.memo(Draggable);

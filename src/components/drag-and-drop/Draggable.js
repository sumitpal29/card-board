import React, { useContext, useCallback } from "react";
import { StateContext } from "../Wrapper";

function Draggable(props) {
  console.log('rendered dragable component', props)
  const stateContext = useContext(StateContext);

  const drag = useCallback((e) => {
    const el = e.target;
    const type = e.target.getAttribute("type");
    e.dataTransfer.setData("transfer", e.target.id);
    e.dataTransfer.setData("target-type", type);

    if (type === "card") {
      console.log("column index sent", props.columnIndex, props.taskIndex, e.target.id);

      e.dataTransfer.setData("column-index", props.columnIndex);
      e.dataTransfer.setData("card-index", props.taskIndex);
    }

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
  }, [props.columnIndex, props.taskIndex, stateContext.currentBoardState.innerChildren]);

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

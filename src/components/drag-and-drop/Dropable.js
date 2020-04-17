import React, { useContext } from "react";
import { StateContext } from "../Wrapper";

function Dropable(props) {
  const stateContext = useContext(StateContext);
  const drop = (e) => {
    e.preventDefault();

    const left = e.target.getBoundingClientRect().left;
    const x = e.pageX;
    const placement = left + 272 / 2 < x ? 1 : 0;
    const index = stateContext.currentBoardState.innerChildren.findIndex(
      (el) => {
        if (el.id === e.target.id) {
          return true;
        }
        return false;
      }
    );

    const draggedIndex = e.dataTransfer.getData("index");
    const draggedFrom = Number(draggedIndex);
    const newPosition = placement + Number(index);

    stateContext.dispatch({
      type: "moveColumn",
      value: {
        draggedFrom,
        newPosition,
      },
    });
    e.target.classList.remove('hovered')
    console.log(placement, newPosition, draggedFrom, e.target.id);
  };

  const allowDrop = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const onDragLeave= e => {
    e.target.classList.remove('hovered')
  }

  const onDragEnter= e=> {
    e.target.classList.add('hovered')
  }

  return (
    <div
      id={props.id}
      className={`droppable-el ${props.classRef || ""}`}
      onDrop={drop}
      onDragOver={allowDrop}
      onDragLeave={onDragLeave}
      onDragEnter={onDragEnter}
      type={props.type}
    >
      {props.children}
    </div>
  );
}

export default Dropable;

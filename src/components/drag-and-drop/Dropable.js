import React, { useContext, useCallback } from "react";
import { StateContext } from "../Wrapper";

function Dropable(props) {
  console.log('rendered dropable component', props)
  const stateContext = useContext(StateContext);
  const constGetParentType = (el) => {
    let loop = true;
    let cardConfig = null;
    let columnConfig = null;

    while(loop) {
      if(el.id === 'boardRow') {
        loop = false;
        return null;
      }
      if (!cardConfig && el.getAttribute('type') === 'card') {
        cardConfig = {
          type: el.getAttribute('type'),
          id: el.id,
          client: el.getBoundingClientRect()
        }
      }
      if(el.getAttribute('type') === 'column') {
        columnConfig = {
          id: el.id
        }
        loop = false
      }
      el = el.parentNode
    }
    return {
      cardConfig, columnConfig
    };
  }
  const drop = useCallback((e) => {
    e.preventDefault();

    const dragElementType = e.dataTransfer.getData("target-type");
    const dropElementType = e.target.getAttribute("type");
    // console.log(
    //   "dropElementType",
    //   dropElementType,
    //   "manage",
    //   props.manage,
    //   "dragElementType",
    //   dragElementType,
    //   e.target
    // );

    if (
      e.target.getAttribute("type") === "column" &&
      dragElementType === "column"
    ) {
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

      console.log('Move', placement, newPosition, draggedFrom, e.target.id);
    } else {
      
      if(dropElementType === 'column' && dragElementType === 'card') {
        const index = stateContext.currentBoardState.innerChildren.findIndex(
          (el) => {
            if (el.id === e.target.id) {
              return true;
            }
            return false;
          }
        );
        console.log(`card droped in a column whose index is ${index} - push in column`)
      }
      if(!dropElementType) {
        const nearestParentDetails = (constGetParentType(e.target));
        const {cardConfig} = nearestParentDetails;
          const {columnConfig} = nearestParentDetails;

        if (cardConfig.type === 'card') {
          // find card index, which column is in
          console.log(nearestParentDetails)
          // call move card
          // required - column index, current card index, placement
          const y = e.pageY;
          
          const placement = (cardConfig.client.top + cardConfig.client.height/2) < y ? 1 : 0
          const index = stateContext.currentBoardState.innerChildren.findIndex(
            (el) => {
              if (el.id === columnConfig.id) {
                return true;
              }
              return false;
            }
          );
          const cardIndex = stateContext.currentBoardState.innerChildren[index].innerChildren.findIndex(
            (el) => {
              if (el.id === cardConfig.id) {
                return true;
              }
              return false;
            }
          );
          console.log('placement',placement, index, cardIndex)
          // column index if different then delete card from its current column and change parent index
          // column index is same then just move the card
        }
      }
      console.log(
        "target",
        e.target,
        "column index",
        e.dataTransfer.getData("column-index"),
        "props",
        props,
        "e.type",
        e.type
      );
    }

    e.target.classList.remove("hovered");
  }, [props, stateContext]);

  const allowDrop = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const onDragLeave = (e) => {
    e.target.classList.remove("hovered");
  };

  const onDragEnter = (e) => {
    e.target.classList.add("hovered");
  };

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

export default React.memo(Dropable);

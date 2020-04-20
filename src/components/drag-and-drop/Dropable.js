import React, { useContext } from "react";
import { StateContext } from "../Wrapper";

const constGetParentType = (el) => {
  let loop = true;
  let cardConfig = null;
  let columnConfig = null;

  while (loop) {
    if (el.id === "boardRow") {
      loop = false;
      return null;
    }
    if (!cardConfig && el.getAttribute("type") === "card") {
      cardConfig = {
        type: el.getAttribute("type"),
        id: el.id,
        client: el.getBoundingClientRect(),
      };
    }
    if (el.getAttribute("type") === "column") {
      columnConfig = {
        id: el.id,
      };
      loop = false;
    }
    el = el.parentNode;
  }
  return {
    cardConfig,
    columnConfig,
  };
};

function Dropable(props) {
  // debugger;
  const stateContext = useContext(StateContext);
  const drop = (e) => {
    e.preventDefault();

    const dragElementType = e.dataTransfer.getData("target-type");
    const dropElementType = e.target.getAttribute("type");

    // when column dragged over column
    if (dropElementType === "column" && dragElementType === "column") {
      const left = e.target.getBoundingClientRect().left;
      const width = e.target.getBoundingClientRect().width;
      const x = e.pageX;
      const placement = left + width / 2 < x ? 1 : 0;
      const columnIndex = stateContext.currentBoardState.innerChildren.findIndex(
        (el) => {
          if (el.id === e.target.id) {
            return true;
          }
          return false;
        }
      );

      const draggedIndex = e.dataTransfer.getData("index");
      const draggedFrom = Number(draggedIndex);
      const newPosition = placement + Number(columnIndex);

      stateContext.dispatch({
        type: "moveColumn",
        value: {
          draggedFrom,
          newPosition,
        },
      });
    } else if (dropElementType === "column" && dragElementType === "card") {
      const newColumnIndex = stateContext.currentBoardState.innerChildren.findIndex(
        (el) => {
          if (el.id === e.target.id) {
            return true;
          }
          return false;
        }
      );
      const draggedCardID = e.dataTransfer.getData("transfer");
      const elData = constGetParentType(document.getElementById(draggedCardID));
      const { columnConfig } = elData;
      const oldColumnIndex = stateContext.currentBoardState.innerChildren.findIndex(
        (el) => {
          if (el.id === columnConfig.id) {
            return true;
          }
          return false;
        }
      );

      if (oldColumnIndex !== newColumnIndex) {
        // change card position
        const cards =
          stateContext.currentBoardState.innerChildren[oldColumnIndex]
            .innerChildren;
        const cardIndex = cards.findIndex((el) => {
          if (el.id === draggedCardID) {
            return true;
          }
          return false;
        });

        stateContext.dispatch({
          type: "chageCardPosition",
          value: {
            oldColumnIndex,
            newColumnIndex,
            cardIndex,
            newIndex: "last",
          },
        });
      }
    }
    // sceenario when droped over element type is unknown
    else if (!dropElementType) {
      const nearestParentDetails = constGetParentType(e.target);

      if (!nearestParentDetails) {
        e.target.classList.remove("hovered");
        // if no relevant data on droped over el found do noting
        return;
      }

      const { cardConfig } = nearestParentDetails;
      const { columnConfig } = nearestParentDetails;

      if (dragElementType === "card") {
        const draggedCardID = e.dataTransfer.getData("transfer");
        const elData = constGetParentType(
          document.getElementById(draggedCardID)
        );
        // find card index, which column is in
        // console.log(nearestParentDetails);
        // call move card
        // required - column index, current card index, placement
        const newColumnIndex = stateContext.currentBoardState.innerChildren.findIndex(
          (el) => {
            if (el.id === columnConfig.id) {
              return true;
            }
            return false;
          }
        );

        const oldColumnIndex = stateContext.currentBoardState.innerChildren.findIndex(
          (el) => {
            if (el.id === elData.columnConfig.id) {
              return true;
            }
            return false;
          }
        );

        const cardOldPosition = stateContext.currentBoardState.innerChildren[
          oldColumnIndex
        ].innerChildren.findIndex((el) => {
          if (el.id === draggedCardID) {
            return true;
          }
          return false;
        });

        let newCardPosition = 0;
        let newIndex = 0;

        const cards =
          stateContext.currentBoardState.innerChildren[newColumnIndex]
            .innerChildren;

        if (cardConfig && cardConfig.type === "card") {
          const y = e.pageY;
          const placement =
            cardConfig.client.top + cardConfig.client.height / 2 < y ? 1 : 0;

          const droppedOverCard = cards.findIndex((el) => {
            if (el.id === cardConfig.id) {
              return true;
            }
            return false;
          });

          newCardPosition = droppedOverCard + placement;
          newIndex = droppedOverCard + placement;
        } else {
          const columnLength =
            stateContext.currentBoardState.innerChildren[newColumnIndex]
              .innerChildren.length;
          newCardPosition = columnLength - 1;
          newIndex = columnLength;
        }
        // if from same column just move the card
        if (newColumnIndex === oldColumnIndex) {
          stateContext.dispatch({
            type: "moveCard",
            value: {
              newCardPosition,
              oldCardPosition: cardOldPosition,
              columnIndex: newColumnIndex,
            },
          });
        } else {
          // if not remove card from old column and place it over new column
          stateContext.dispatch({
            type: "chageCardPosition",
            value: {
              oldColumnIndex,
              newColumnIndex,
              cardIndex: cardOldPosition, // old card index
              newIndex,
            },
          });
        }
        // column index if different then delete card from its current column and change parent index
        // column index is same then just move the card
        // drop it inside column
      } else if (dragElementType === "column") {
        // find which column
        if (!columnConfig || !columnConfig.id) {
          return;
        }
        const newColumnId = columnConfig.id;
        const elClient = document
        .getElementById(newColumnId)
        .getBoundingClientRect()
        const left = elClient.left;
        const x = e.pageX;
        const placement = left + elClient.width / 2 < x ? 1 : 0;
        const index = stateContext.currentBoardState.innerChildren.findIndex(
          (el) => {
            if (el.id === newColumnId) {
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
      }
    }

    e.target.classList.remove("hovered");
  };

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

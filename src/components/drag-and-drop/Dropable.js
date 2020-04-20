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

const findIndex = (arr, id) => {
  arr.findIndex((el) => {
    if (el.id === id) {
      return true;
    }
    return false;
  });
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
      const x = e.pageX;
      const placement = left + 272 / 2 < x ? 1 : 0;
      const columnIndex = findIndex(
        stateContext.currentBoardState.innerChildren,
        e.target.id
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
      const newColumnIndex = findIndex(
        stateContext.currentBoardState.innerChildren,
        e.target.id
      );
      const draggedCardID = e.dataTransfer.getData("transfer");
      const elData = constGetParentType(document.getElementById(draggedCardID));
      const { columnConfig } = elData;
      const oldColumnIndex = findIndex(
        stateContext.currentBoardState.innerChildren,
        columnConfig.id
      );

      if (oldColumnIndex !== newColumnIndex) {
        // change card position
        const cards =
          stateContext.currentBoardState.innerChildren[oldColumnIndex]
            .innerChildren;
        const cardIndex = findIndex(cards, draggedCardID);

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

      if (
        cardConfig &&
        cardConfig.type === "card" &&
        dragElementType === "card"
      ) {
        // find card index, which column is in
        // console.log(nearestParentDetails);
        // call move card
        // required - column index, current card index, placement
        const y = e.pageY;
        const placement =
          cardConfig.client.top + cardConfig.client.height / 2 < y ? 1 : 0;

        const newColumnIndex = stateContext.currentBoardState.innerChildren.findIndex((el) => {
          if (el.id === columnConfig.id) {
            return true;
          }
          return false;
        });
        // findIndex(
        //   stateContext.currentBoardState.innerChildren,
        //   columnConfig.id
        // );

        // const droppedOverCard = stateContext.currentBoardState.innerChildren[
        //   newColumnIndex
        // ].innerChildren.findIndex((el) => {
        //   if (el.id === cardConfig.id) {
        //     return true;
        //   }
        //   return false;
        // });

        const cards =
          stateContext.currentBoardState.innerChildren[newColumnIndex].innerChildren;
        const droppedOverCard = findIndex(cards, cardConfig.id);

        const draggedCardID = e.dataTransfer.getData("transfer");
        const elData = constGetParentType(
          document.getElementById(draggedCardID)
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

        if (newColumnIndex === oldColumnIndex) {
          stateContext.dispatch({
            type: "moveCard",
            value: {
              newCardPosition: droppedOverCard + placement,
              oldCardPosition: cardOldPosition,
              columnIndex: newColumnIndex,
            },
          });
        } else {
          stateContext.dispatch({
            type: "chageCardPosition",
            value: {
              oldColumnIndex,
              newColumnIndex,
              cardIndex: cardOldPosition, // old card index
              newIndex: droppedOverCard + placement,
            },
          });
        }
        // column index if different then delete card from its current column and change parent index
        // column index is same then just move the card
      } else if (dragElementType === "card" && !cardConfig) {
        // drop it inside column
        const newColumnIndex = stateContext.currentBoardState.innerChildren.findIndex(
          (el) => {
            if (el.id === columnConfig.id) {
              return true;
            }
            return false;
          }
        );

        const columnLength =
          stateContext.currentBoardState.innerChildren[newColumnIndex]
            .innerChildren.length;
        const draggedCardID = e.dataTransfer.getData("transfer");
        const elData = constGetParentType(
          document.getElementById(draggedCardID)
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

        if (newColumnIndex !== oldColumnIndex) {
          // push at the end
          stateContext.dispatch({
            type: "chageCardPosition",
            value: {
              oldColumnIndex,
              newColumnIndex,
              cardIndex: cardOldPosition, // old card index
              newIndex: columnLength,
            },
          });
        } else {
          stateContext.dispatch({
            type: "moveCard",
            value: {
              newCardPosition: columnLength - 1,
              oldCardPosition: cardOldPosition,
              columnIndex: newColumnIndex,
            },
          });
        }
      } else if (dragElementType === "column") {
        // find which column
        if (!columnConfig || !columnConfig.id) {
          return;
        }
        const newColumnId = columnConfig.id;
        const left = document
          .getElementById(newColumnId)
          .getBoundingClientRect().left;
        const x = e.pageX;
        const placement = left + 272 / 2 < x ? 1 : 0;
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

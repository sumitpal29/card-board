import { useReducer } from "react";

const boardInitialState = {
  id: "customBoard",
  type: "board",
  innerChildren: [],
};

const defaultColumn = () => ({
  identifier: `column${Math.random().toString().slice(2, 8)}`,
  type: "column",
  header: '',
  innerChildren: [],
});

const moveArrayElement = (arr, old, to) => {
  arr.splice(to, 0, arr.splice(old, 1)[0]);
};

function reducer(state, action) {
  console.log("prevState: ", state);
  console.log("action: ", action);

  switch (action.type) {
    case "addColumn":
      const newColumn = defaultColumn();
      newColumn.id = state.id + "_" + newColumn.identifier;
      newColumn.parentId = state.id;
      newColumn.header = action.value;

      console.log({
        ...state,
        innerChildren: [...state.innerChildren, newColumn],
      });

      return {
        ...state,
        innerChildren: [...state.innerChildren, newColumn],
      };

    case "moveColumn":
      const elArr = [...state.innerChildren];

      moveArrayElement(
        elArr,
        action.value.draggedFrom,
        action.value.newPosition
      );

      return {
        ...state,
        innerChildren: elArr,
      };

    case "updateColumnHeader":
      const updatedCard = action.value;
      console.log(updatedCard);
      return state;

    case "addCard":
      console.log("add card called", action.value);
      let columns = [...state.innerChildren];
      const column = [
        ...columns[action.value.index].innerChildren,
        action.value.card,
      ];
      columns[action.value.index].innerChildren = column;
      const r = {
        ...state,
        innerChildren: [...columns],
      };
      console.log("addCard", r);
      return r;

    case "changeColumnHeader":
      const { header } = action.value;
      const { index } = action.value;

      const _columns = [...state.innerChildren];
      _columns[index].header = header;
      
      return {
        ...state,
        innerChildren: [..._columns],
      };

    case "chageCardPosition":
      const { oldColumnIndex } = action.value;
      const { newColumnIndex } = action.value;
      const { cardIndex } = action.value;
      const clonedState = { ...state };

      let newIndex =
        action.value === "last"
          ? clonedState.innerChildren[newColumnIndex].length
          : action.value.newIndex;

      const removedItem = clonedState.innerChildren[
        oldColumnIndex
      ].innerChildren.splice(cardIndex, 1);
      clonedState.innerChildren[newColumnIndex].innerChildren.splice(
        newIndex,
        0,
        removedItem[0]
      );

      return clonedState;
    case "moveCard":
      const { newCardPosition } = action.value;
      const { oldCardPosition } = action.value;
      const { columnIndex } = action.value;

      const clonedInnerChildren = [...state.innerChildren];
      const innerCardArray = [
        ...clonedInnerChildren[columnIndex].innerChildren,
      ];

      moveArrayElement(innerCardArray, oldCardPosition, newCardPosition);

      clonedInnerChildren[columnIndex].innerChildren = innerCardArray;

      console.log(
        newCardPosition,
        oldCardPosition,
        columnIndex,
        innerCardArray
      );

      return {
        ...state,
        innerChildren: [...clonedInnerChildren],
      };

    default:
      return state;
  }
}

export default function useCallReducer() {
  return useReducer(reducer, boardInitialState);
}

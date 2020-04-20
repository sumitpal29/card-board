import { useReducer } from "react";
import { getLocalData, setLocalData, moveArrayElement } from "./utils";

let boardInitialState = {
  id: "customBoard",
  type: "board",
  innerChildren: [],
  isCachingEnabled: false,
};

const defaultColumn = () => ({
  identifier: `column${Math.random().toString().slice(2, 8)}`,
  type: "column",
  header: "",
  innerChildren: [],
});

const updateLocalState = (state) => {
  state.isCachingEnabled && setLocalData("board", JSON.stringify(state));
  return state;
};

function reducer(state, action) {
  switch (action.type) {
    case "addColumn":
      const newColumn = defaultColumn();
      newColumn.id = state.id + "_" + newColumn.identifier;
      newColumn.parentId = state.id;
      newColumn.header = action.value;

      return updateLocalState({
        ...state,
        innerChildren: [...state.innerChildren, newColumn],
      });

    case "deleteColumn":
      const oldState = { ...state };
      oldState.innerChildren.splice(action.value, 1);

      return updateLocalState(oldState);

    case "deleteCard":
      const oldColumnState = { ...state };
      oldColumnState.innerChildren[
        action.value.columnIndex
      ].innerChildren.splice(action.value.cardIndex, 1);
      return updateLocalState(oldColumnState);

    case "moveColumn":
      const elArr = [...state.innerChildren];

      moveArrayElement(
        elArr,
        action.value.draggedFrom,
        action.value.newPosition
      );

      return updateLocalState({
        ...state,
        innerChildren: elArr,
      });

    case "addCard":
      let columns = [...state.innerChildren];
      const column = [
        ...columns[action.value.index].innerChildren,
        action.value.card,
      ];
      columns[action.value.index].innerChildren = column;

      return updateLocalState({
        ...state,
        innerChildren: [...columns],
      });

    case "changeColumnHeader":
      const { header } = action.value;
      const { index } = action.value;

      const _columns = [...state.innerChildren];
      _columns[index].header = header;

      return updateLocalState({
        ...state,
        innerChildren: [..._columns],
      });

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

      return updateLocalState(clonedState);

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

      return updateLocalState({
        ...state,
        innerChildren: [...clonedInnerChildren],
      });
    case "updateCard":
      const _state = { ...state };
      const props = action.value;
      _state.innerChildren[props.columnIndex].innerChildren[props.cardIndex] =
        props.card;

      return updateLocalState({
        ..._state,
      });

    case "changeLocalStoreOption":
      return updateLocalState({
        ...state,
        isCachingEnabled: action.value,
      });

    default:
      return state;
  }
}

export default function useCallReducer() {
  const localBoradData = getLocalData("board");
  if (!localBoradData) {
    setLocalData("board", JSON.stringify(boardInitialState));
  } else {
    const parsed = JSON.parse(localBoradData);
    if (parsed.id && parsed.type && parsed.innerChildren.length) {
      boardInitialState = parsed;
    }
  }
  return useReducer(reducer, boardInitialState);
}

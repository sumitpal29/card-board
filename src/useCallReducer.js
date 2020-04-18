import { useReducer } from "react";

const boardInitialState = {
  id: "customBoard",
  type: "board",
  innerChildren: [],
};
const defaultColumn = () => ({
  identifier: `column${Math.random().toString().slice(2, 8)}`,
  type: "column",
  header: `column header ${Math.random().toString().slice(2, 8)}`,
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
      const columns = [...state.innerChildren];
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

    case "chageCardPosition": 
      const {oldColumnIndex} = action.value
      const {newColumnIndex} = action.value
      const {cardIndex} = action.value

      const clonedState = {...state}

      let newIndex = action.value === 'last' ? clonedState.innerChildren[newColumnIndex].length : action.value.newIndex

    
      console.log('chageCardPosition', oldColumnIndex, newColumnIndex, cardIndex, newIndex)

      
      // const oldColumn = [...clonedState.innerChildren[oldColumnIndex]]
      const removedItem = clonedState.innerChildren[oldColumnIndex].innerChildren.splice(cardIndex, 1)
      clonedState.innerChildren[newColumnIndex].innerChildren.splice(newIndex, 0, removedItem[0])
      console.log(clonedState)
      return clonedState;

    default:
      return state;
  }
}

export default function useCallReducer() {
  return useReducer(reducer, boardInitialState);
}

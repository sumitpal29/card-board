import React, { useReducer, useState } from "react";
import CardContainer from "./CardContainer";

import Droppable from "./drag-and-drop/Dropable";
import Draggable from "./drag-and-drop/Draggable";

export const StateContext = React.createContext();

const defaultColumn = () => ({
  identifier: `column${Math.random().toString().slice(2, 8)}`,
  type: "column",
  header: `column header ${Math.random().toString().slice(2, 8)}`,
  innerChildren: [],
});

const defaultCard = () => ({
  id: `card_${Math.random().toString()}`,
  type: "card",
  header: "Some random header",
  description: "Some Random description",
  labels: {
    header: "label",
    marks: [],
  },
});

const boardInitialState = {
  id: "customBoard",
  type: "board",
  innerChildren: [],
};

const moveArrayElement = (arr, old, to) => {
  arr.splice(to, 0, arr.splice(old, 1)[0]);
};

const reducer = (state, action) => {
  switch (action.type) {
    case "addColumn":
      const newColumn = defaultColumn();
      newColumn.id =
        state.id +
        "_" +
        newColumn.identifier +
        "_" +
        state.innerChildren.length;
      newColumn.parentId = state.id;
      newColumn.header = action.value;

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
      // const index = state.innerChildren.findIndex(
      //   (el) => {
      //     if (el.id === updatedCard.id) {
      //       return true;
      //     }
      //     return false;
      //   }
      // );
      console.log(updatedCard);
      return state;

    default:
      return state;
  }
};

function Wrapper() {
  const [currentBoardState, dispatch] = useReducer(reducer, boardInitialState);
  const [isAddOptVisible, setIsAddOptVisible] = useState(false);
  const [coulumnHeader, setCoulumnHeader] = useState("");

  const handleColumnHeaderChange = (e) => {
    setCoulumnHeader(e.target.value);
  };
  const handleAddColumn = () => {
    setIsAddOptVisible(false);
    dispatch({ type: "addColumn", value: coulumnHeader });
    setCoulumnHeader("");
  };

  return (
    <StateContext.Provider value={{ currentBoardState, dispatch }}>
      <div className="row">
        <Droppable
          id={currentBoardState.id}
          classRef="columns"
          type={currentBoardState.type}
        >
          {/* Each column is dragable but can not be dropped inside other column */}
          {currentBoardState.innerChildren.map((item, key) => (
            <Draggable key={`column_${key}`} classRef="column" card={item}>
              <h4>{item.header}</h4>
              <CardContainer />
            </Draggable>
          ))}
          <div className="column">
            <div
              className="add-btn"
              onClick={() => {
                setIsAddOptVisible(true);
              }}
            >
              {!isAddOptVisible ? (
                <div>+ New Column {isAddOptVisible+''}</div>
              ) : (
                <div className="columnForm">
                {isAddOptVisible+''}
                  <input
                    type="text"
                    onChange={handleColumnHeaderChange}
                    value={coulumnHeader}
                  />
                  <button onClick={handleAddColumn}>Add</button>
                </div>
              )}
            </div>
          </div>
        </Droppable>
      </div>
    </StateContext.Provider>
  );
}

export default Wrapper;

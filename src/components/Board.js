import React, { useContext, useState, useCallback, useEffect } from "react";
import { StateContext } from "./Wrapper";
import CardContainer from "./CardContainer";

import Droppable from "./drag-and-drop/Dropable";
import Draggable from "./drag-and-drop/Draggable";

const Board = () => {
  const stateContext = useContext(StateContext);
  console.log("rendered Board component");
  const [isAddOptVisible, setIsAddOptVisible] = useState(false);
  const [coulumnHeader, setCoulumnHeader] = useState("");

  const handleColumnHeaderChange = useCallback((e) => {
    console.log("in");
    setCoulumnHeader(e.target.value);
  }, []);

  const handleOnAddColumn = useCallback(() => {
    setIsAddOptVisible(!isAddOptVisible);
  }, [isAddOptVisible]);

  const handleAddColumn = useCallback(() => {
    setIsAddOptVisible(false);
    stateContext.dispatch({ type: "addColumn", value: coulumnHeader });
    setCoulumnHeader("");
  }, [coulumnHeader, stateContext]);

  useEffect(() => {
    console.log("I am JOKER's useEffect--->");
  }, []);

  return (
    <div id="boardRow" className="row">
      <Droppable
        id={stateContext.currentBoardState.id}
        classRef="columns"
        type={stateContext.currentBoardState.type}
        manage="horizontally"
      >
        {/* Each column is dragable but can not be dropped inside other column */}
        {stateContext.currentBoardState.innerChildren.map((item, key) => (
          <Draggable key={`column_${key}`} classRef="column" card={item}>
            <CardContainer index={key} />
          </Draggable>
        ))}
        <div className="column">
          <div className="add-btn">
            {!isAddOptVisible ? (
              <div onClick={handleOnAddColumn}>
                + New Column {isAddOptVisible + ""}
              </div>
            ) : (
              <div className="columnForm">
                {isAddOptVisible + ""}
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
  );
};
export default React.memo(Board);

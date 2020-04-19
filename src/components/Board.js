import React, { useContext, useState, useCallback, useEffect } from "react";
import { StateContext } from "./Wrapper";
import CardContainer from "./CardContainer";
import { adjustTextAreaheight } from "../utils";

import Droppable from "./drag-and-drop/Dropable";
import Draggable from "./drag-and-drop/Draggable";

const Board = () => {
  const stateContext = useContext(StateContext);
  const [isAddOptVisible, setIsAddOptVisible] = useState(false);
  const [coulumnHeader, setCoulumnHeader] = useState("");
  let inputColumn = null;

  const handleOnAddColumn = useCallback(() => {
    setIsAddOptVisible(!isAddOptVisible);
  }, [isAddOptVisible]);

  const handleAddColumn = useCallback(() => {
    if (coulumnHeader.length) {
      setIsAddOptVisible(false);
      stateContext.dispatch({ type: "addColumn", value: coulumnHeader });
      setCoulumnHeader("");
    }
  }, [coulumnHeader, stateContext]);

  const keyPress = (e) => {
    if (e.keyCode === 27) {
      setCoulumnHeader("");
      setIsAddOptVisible(false);
    }
  };

  useEffect(() => {
    isAddOptVisible && inputColumn && setTimeout(() => inputColumn.focus(), 0);
  }, [inputColumn, isAddOptVisible]);

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
          <div className={`add-item-controller ${isAddOptVisible && "active"}`}>
            {!isAddOptVisible ? (
              <div className="column-form" onClick={handleOnAddColumn}>
                + New Column {isAddOptVisible + ""}
              </div>
            ) : (
              <div className="column-form">
                <textarea
                  rows="auto"
                  focus="true"
                  ref={(e) => (inputColumn = e)}
                  onChange={(e) =>
                    adjustTextAreaheight(e.target, setCoulumnHeader)
                  }
                  onKeyDown={keyPress}
                  className="text-area text-area__header mb-1"
                  value={coulumnHeader}
                ></textarea>
                <button className="btn btn-primary" onClick={handleAddColumn}>
                  Add
                </button>
                
                <button onClick={() => setIsAddOptVisible(false)} className="btn btn-secondary">
              Close
            </button>
              </div>
            )}
          </div>
        </div>
      </Droppable>
    </div>
  );
};
export default React.memo(Board);

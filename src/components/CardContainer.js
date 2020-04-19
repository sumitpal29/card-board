import React, { useContext, useCallback, useState, useEffect } from "react";
import Task from "./Task";
import { StateContext } from "./Wrapper";
import Draggable from "./drag-and-drop/Draggable";
import { debounce, adjustTextAreaheight } from "../utils";

const defaultCard = (i) => ({
  id: `card_${Math.random().toString().slice(2, 8)}`,
  type: "card",
  header: `Card header`,
  description: "",
  properties: {
    label: "",
  },
});

function CardContainer(props) {
  const stateContext = useContext(StateContext);
  const card = stateContext.currentBoardState.innerChildren[props.index];

  const [cardHeader, setCardHeader] = useState(card.header);
  const [isAddOptVisible, setAddOption] = useState(false);
  const [newCardHeader, setNewCardHeader] = useState("");

  let textHeader = null;
  let inputColumn = null;

  useEffect(() => {
    setCardHeader(card.header);
    textHeader && adjustTextAreaheight(textHeader);
  }, [card.header, textHeader]);

  const handleAddCard = useCallback(() => {
    if (newCardHeader.length > 0) {
      const card = defaultCard(props.index);
      card.header = newCardHeader;
      stateContext.dispatch({
        type: "addCard",
        value: {
          card,
          index: props.index,
        },
      });
      // update things back to default
      setNewCardHeader("");
      setAddOption(false);
    }
  }, [newCardHeader, props.index, stateContext]);

  const updateColumnHeader = (value) => {
    stateContext.dispatch({
      type: "changeColumnHeader",
      value: {
        header: value,
        index: props.index,
      },
    });
  };
  const deboucedFn = debounce(updateColumnHeader, 1000);
  const setCardHeaderFn = (val) => {
    setCardHeader(val);
    // call debounce and delay in text-typing / updating state :)
    deboucedFn(val);
  };

  const keyPress = (e) => {
    if (e.keyCode === 27) {
      setNewCardHeader("");
      setAddOption(false);
    }
  };

  useEffect(() => {
    isAddOptVisible && inputColumn && setTimeout(() => inputColumn.focus(), 0);
  }, [inputColumn, isAddOptVisible]);

  return (
    <div className="card-container">
      <div className="card-container__header">
        <textarea
          rows="auto"
          id="textHeader"
          ref={(e) => {
            textHeader = e;
          }}
          onChange={(e) => adjustTextAreaheight(e.target, setCardHeaderFn)}
          className="text-area text-area__header"
          value={cardHeader}
        ></textarea>
        <div className="delete-card">delete</div>
      </div>
      {/* this will a dragable content */}
      <div manage="vertically" id={card.id}>
        {card.innerChildren.map((cardObj, key) => (
          <Draggable
            key={`card_${key}`}
            classRef="card-dragable"
            card={cardObj}
          >
            <Task columnIndex={props.index} taskIndex={key} />
          </Draggable>
        ))}
      </div>
      {/* On click add card it will add one more draggable task */}
      <div className={`add-item-controller ${isAddOptVisible && "active"}`}>
        {!isAddOptVisible ? (
          <div className="column-form" onClick={() => setAddOption(true)}>+ Add another card</div>
        ) : (
          <div className="column-form">
            <textarea
              rows="auto"
              ref={(e) => (inputColumn = e)}
              onChange={(e) => adjustTextAreaheight(e.target, setNewCardHeader)}
              onKeyDown={keyPress}
              className="text-area text-area__header mb-1"
              value={newCardHeader}
            ></textarea>
            <button className="btn btn-primary" onClick={handleAddCard}>
              Add
            </button>
            <span onClick={() => setAddOption(false)} className="cross">
              X
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default React.memo(CardContainer);

import React, { useContext, useCallback, useState } from "react";
import Task from "./Task";
import { StateContext } from "./Wrapper";
import Draggable from "./drag-and-drop/Draggable";
import { debounce, adjustTextAreaheight } from "../utils";

const defaultCard = (i) => ({
  id: `card_${Math.random().toString().slice(2, 8)}`,
  type: "card",
  header: `Card header`,
  parentIndex: i,
  description: "Some Random description",
  labels: {
    header: "label",
    marks: [],
  },
});

function CardContainer(props) {
  const stateContext = useContext(StateContext);
  const card = stateContext.currentBoardState.innerChildren[props.index];

  const [cardHeader, setCardHeader] = useState(card.header);


  const handleAddCard = useCallback(() => {
    console.log("*********adding card called*********");
    stateContext.dispatch({
      type: "addCard",
      value: {
        card: defaultCard(props.index),
        index: props.index,
      },
    });
  }, [props.index, stateContext]);

  const setCardHeaderFn = (val) => {
    console.log("called bounced", val);
    setCardHeader(val);
    // stateContext.dispatch({
    //   type: "changeColumnHeader",
    //   value: {
    //     header: val,
    //     index: props.index,
    //   },
    // });
  };
  const deboucedFn = debounce(setCardHeaderFn, 500);

  return (
    <div className="card-container">
      <div className="card-container__header">
        <textarea
          rows="auto"
          onChange={(e) =>
            adjustTextAreaheight(e.target, setCardHeaderFn)
          }
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
      <div className="add-item-controller">
        <div className="card-header" onClick={handleAddCard}>
          + Add another card
        </div>
      </div>
    </div>
  );
}

export default React.memo(CardContainer);

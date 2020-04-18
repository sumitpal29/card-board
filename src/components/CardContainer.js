import React, {  useContext, useCallback } from "react";
import Task from "./Task";
import { StateContext } from "./Wrapper";
import Droppable from "./drag-and-drop/Dropable";
import Draggable from "./drag-and-drop/Draggable";

const defaultCard = (i) => ({
  id: `card_${Math.random().toString()}`,
  type: "card",
  header: `Card header ${Math.random().toString()}`,
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
  console.log('rendered card component', card)

  
  // const [inputValue, setInputValue] = useState("");
  // const handleCardHeaderChange = (e) => {
  //   setInputValue(e.target.value);
  //   console.log("called");
  //   stateContext.dispatch({
  //     type: "updateColumnHeader",
  //     value: { ...props.card, header: e.target.value},
  //   });
  // };

  const handleAddCard = useCallback(() => {
    console.log('*********adding card called*********')
    stateContext.dispatch({type: 'addCard', value: {
      card: defaultCard(props.index),
      index: props.index
    }})
  }, [props.index, stateContext])

  return (
    <div className="card-container">
      <div className="card">
        <div className="card-header">{card.header}</div>
      </div>
      {/* this will a dragable content */}
      <Droppable manage="vertically" id={card.id} classRef="card-column" type="cardBoard">
        {card.innerChildren.map((cardObj, key) => (
          <Draggable key={`card_${key}`} columnIndex={props.index} taskIndex={key} classRef="card-column-dragable" card={cardObj}>
            <Task columnIndex={props.index} taskIndex={key}/>
          </Draggable>
        ))}
      </Droppable>

      {/* On click add card it will add one more draggable task */}
      <div className="card">
        <div className="card-header" onClick={handleAddCard}>Add Card +</div>
      </div>
    </div>
  );
}

export default React.memo(CardContainer);

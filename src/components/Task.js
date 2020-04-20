import React, { useContext, useState, useEffect } from "react";
import { StateContext } from "./Wrapper";
import Modal from "react-modal";
import { adjustTextAreaheight } from "../utils";

Modal.setAppElement("#root");
function Task(props) {
  const stateContext = useContext(StateContext);
  const task =
    stateContext.currentBoardState.innerChildren[props.columnIndex]
      .innerChildren[props.cardIndex];
  let inputColumn = null;
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [cardHeader, setCardHeader] = useState(task.header);
  const [cardDescription, setCardDescription] = useState(task.description);
  const [priority, setPriority] = useState("none");

  const handleUpdate = () => {
    setModalIsOpen(false);
    stateContext.dispatch({
      type: "updateCard",
      value: {
        cardIndex: props.cardIndex,
        columnIndex: props.columnIndex,
        card: {
          ...task,
          header: cardHeader,
          description: cardDescription,
          properties: {
            ...task.properties,
            priority,
          },
        },
      },
    });
  };

  const changePriority = (e) => {
    setPriority(e.target.value);
  };

  const handleDelete = () => {
    stateContext.dispatch({
      type: "deleteCard",
      value: {
        cardIndex: props.cardIndex,
        columnIndex: props.columnIndex,
      },
    });
  };

  useEffect(() => {
    modalIsOpen && inputColumn && setTimeout(() => inputColumn.focus(), 0);
  }, [inputColumn, modalIsOpen]);

  return (
    <>
      <div className="box" onClick={() => setModalIsOpen(true)}>
        <div className="box-header">
          {/* <input type="text" placeholder="Sample Header"/> */}
          <h3>{task.header}</h3>
        </div>
        {task.description.length ? (
          <div className="box-body">{task.description}</div>
        ) : (
          ""
        )}

        <div className={`priority-box ${task.properties.priority}`}></div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Configure Card"
      >
        <div className="modal-content">
          <h2>Configure Card</h2>
          <textarea
            rows="auto"
            ref={(e) => (inputColumn = e)}
            onChange={(e) => adjustTextAreaheight(e.target, setCardHeader)}
            className="text-area text-area__header mb-1"
            value={cardHeader}
          ></textarea>
          <h3>Description</h3>
          <textarea
            rows="3"
            onChange={(e) => setCardDescription(e.target.value)}
            className="text-area text-area__header mb-1 text-area__fixed"
            value={cardDescription}
          ></textarea>
          <h3>Add Priority</h3>
          <div onChange={changePriority} className="priority-container">
            
            <label className="switch rounded">
              <input type="radio" name="priority" value="red" />
              <div className="priority red"></div>
            </label>
            
            <label className="switch rounded">
              <input type="radio" name="priority" value="yellow" />
              <div className="priority yellow"></div>
            </label>
            
            <label className="switch rounded">
              <input type="radio" name="priority" value="green" />
              <div className="priority green"></div>
            </label>
            
            <label className="switch rounded">
              <input type="radio" name="priority" value="pink" />
              <div className="priority pink"></div>
            </label>

            <label className="switch rounded">
              <input type="radio" name="priority" value="blue" />
              <div className="priority blue"></div>
            </label>

            <label className="switch rounded">
              <input type="radio" name="priority" value="none" />
              <div className="priority none"></div>
            </label>

          </div>
          <div className="btn-container">
            <button onClick={handleDelete} className="btn btn-danger">
              DELETE
            </button>
            <button onClick={handleUpdate} className="btn btn-primary">
              Update
            </button>
            <button
              onClick={() => setModalIsOpen(false)}
              className="btn btn-secondary"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default React.memo(Task);

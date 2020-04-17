import React from "react";
// import CardContainer from "./CardContainer";
import Droppable from "./drag-and-drop/Dropable";
import Draggable from "./drag-and-drop/Draggable";

function Wrapper() {
  return (
    <div className="row">
      <div id="dp1" className="columns">
        {/* Each column is dragable but can not be dropped inside other column */}
        {/* <Draggable id="d1" classRef="column">
                    <CardContainer />
                </Draggable> */}
        {/* <Draggable id="d2" classRef="column">
                    <CardContainer />
                </Draggable> */}
        <div className="column">
          <Droppable id="d1" type="simple">
            <Draggable id="item1" type="simple-child">
              <span>Item 1</span>
            </Draggable>
            <Draggable id="item2" type="simple-child">
              <span>Item 2</span>
            </Draggable>
            <Draggable id="item3" type="simple-child">
              <span>Item 3</span>
            </Draggable>
          </Droppable>
          <Droppable id="d2"  type="simple"></Droppable>
        </div>
        <div className="column">some content</div>
        <div className="column">some content</div>
        <div className="column">some content</div>
        <div className="column">some content</div>
      </div>
    </div>
  );
}

export default Wrapper;

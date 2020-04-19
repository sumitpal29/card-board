import React, { useContext } from "react";
import { StateContext } from "./Wrapper";

function Task(props) {
  // console.log('rendered ---- task component', props)
  const stateContext = useContext(StateContext);
  const task =
    stateContext.currentBoardState.innerChildren[props.columnIndex]
      .innerChildren[props.taskIndex];
      
  return (
    <div className="box">
      <div className="box-header">
        {/* <input type="text" placeholder="Sample Header"/> */}
        <h2>{task.header}</h2>
        <span>Edit Button</span>
      </div>
      <div className="box-body">{task.description}</div>
      <div className="box-footer">Footer</div>
    </div>
  );
}

export default React.memo(Task);

import React from "react";
import useCallReducer from "../useCallReducer";

export const StateContext = React.createContext();


function Wrapper(props) {
  console.log("rendered wrapper component");
  const [currentBoardState, dispatch] = useCallReducer();

  return (
    <StateContext.Provider value={{ currentBoardState, dispatch }}>
      {props.children}
    </StateContext.Provider>
  );
}

export default React.memo(Wrapper);

import React, { useState, useContext, useCallback } from "react";
import { StateContext } from "./Wrapper";

function Header() {
  const stateContext = useContext(StateContext);
  const [isCachingEnabled, setIsCachingEnabled] = useState(
    stateContext.currentBoardState.isCachingEnabled
  );

  const handleToggle = useCallback(() => {
    stateContext.dispatch({
      type: "changeLocalStoreOption",
      value: !isCachingEnabled,
    });
    
    setIsCachingEnabled(!isCachingEnabled);
    
  }, [isCachingEnabled, stateContext]);

  return (
    <header className="header">
      <div className="header-logo">
        <img src="../../post-it.svg" height="30" alt="" />
        <span>Card-Borad</span>
      </div>
      <div className="header-actions">
        <span>store data locally</span>
        <label className="switch">
          <input
            type="checkbox"
            checked={isCachingEnabled}
            onChange={handleToggle}
          />

          <span className="slider"></span>
        </label>
        {/* <span onClick={() => clearLocalData()}>reset</span> */}
      </div>
    </header>
  );
}

export default React.memo(Header);

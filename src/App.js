import React from "react";
import Wrapper from "./components/Wrapper";
import Board from "./components/Board";

import "./App.css";

function App() {
  console.log("rendered App component");
  return (
    <div className="card-board">
      <div className="layout">
        <header className="header">Sumit</header>
        <Wrapper>
          <Board />
        </Wrapper>
      </div>
    </div>
  );
}

export default App;

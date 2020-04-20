import React from "react";
import Wrapper from "./components/Wrapper";
import Board from "./components/Board";
import Header from "./components/Header";

import "./App.scss";

function App() {
  return (
    <div className="card-board">
      <div className="layout">
        <Wrapper>
          <Header />
          <Board />
        </Wrapper>
      </div>
    </div>
  );
}

export default App;

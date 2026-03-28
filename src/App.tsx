import { useState, useRef } from "react";

import Whiteboard from "./whiteboard";
import Sidebar from "./sidebar";
import "./App.css";
import "./style.css";

function App() {
  const [activeTool, setActiveTool] = useState("Pencil");
  const [colorValue, setColorValue] = useState("white");

  return (
    <>
      <div className="wrapper">
        <Sidebar
          activeTool={activeTool}
          setActiveTool={setActiveTool}
          colorValue={colorValue}
          setColorValue={setColorValue}
        />
        <Whiteboard
          activeTool={activeTool}
          setActiveTool={setActiveTool}
          colorValue={colorValue}
          setColorValue={setColorValue}
        />
      </div>
    </>
  );
}

export default App;

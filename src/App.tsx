import { useState,useRef } from "react";

import Whiteboard from "./whiteboard";
import Sidebar from "./sidebar";
import "./App.css";
import "./style.css";

function App() {

  const [activeTool, setActiveTool] = useState("Pencil");

  return (
    <>
      <div className="wrapper">
        <Sidebar activeTool = {activeTool} setActiveTool = {setActiveTool}/>
        <Whiteboard activeTool = {activeTool} setActiveTool = {setActiveTool}/>
      </div>
    </>
  );
}

export default App;

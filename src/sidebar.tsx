import { Pencil, Eraser, Download, SunMoon } from "lucide-react";

function Sidebar(props) {
  return (
    <aside id="sidebar" className="sidebar">
      <nav>
        <div
          className={`navLink  ${props.activeTool === "Pencil" ? "is-active" : ""}`}
          onClick={() => props.setActiveTool("Pencil")}
          title="Pencil"
        >
          <Pencil />
          <span className="srOnly">Pencil</span>
        </div>
        <div
          className={`navLink  ${props.activeTool === "Eraser" ? "is-active" : ""}`}
          onClick={() => props.setActiveTool("Eraser")}
          title="Eraser"
        >
          <Eraser />
          <span className="srOnly">Eraser</span>
        </div>
        <div
          className={`navLink  ${props.activeTool === "Input" ? "is-active" : ""}`}
          onClick={() => props.setActiveTool("Input")}
          title="Color"
        >
          <input type="color" className="colorInput" />
          <span className="srOnly">Eraser</span>
        </div>
        <div
          className={`navLink  ${props.activeTool === "Save" ? "is-active" : ""}`}
          onClick={() => props.setActiveTool("Save")}
          title="Download"
        >
          <Download />
          <span className="srOnly">Download</span>
        </div>
        <div
          className={`navLink  ${props.activeTool === "Mode" ? "is-active" : ""}`}
          onClick={() => props.setActiveTool("Mode")}
          title="Darkmode"
        >
          <SunMoon />
          <span className="srOnly">Mode</span>
        </div>

        <div className="active"></div>
        <span className="animation"></span>
      </nav>
    </aside>
  );
}

export default Sidebar;

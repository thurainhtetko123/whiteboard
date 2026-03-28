import { useRef, useState, useEffect } from "react";
function Whiteboard(props) {
  // this set the tool
  // type Tool = "pencil" | "eraser" | null;
  // const [chosen, setChoose] = useState<Tool>(null);
  // function Choose(tool: Exclude<Tool, null>) {
  //   setChoose((current) => (current === tool ? null : tool));
  // }

  //  this set color for pen
  // const [color, setColor] = useState("#000000");
  // const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const newColor = e.target.value;
  //   setColor(e.target.value);
  // };


  // get context of the canvas to draw like searching where and what to draw
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);

  const [isDrawing, setDrawing] = useState(false);

  // resize canvas according to css
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
  }, []);

  // rh the drawing materials
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    
    if(props.activeTool == "Pencil"){
      context.lineWidth = 4;
    }else if (props.activeTool == "Eraser"){
      context.lineWidth = 20;
    }
    context.lineCap = "round";
    context.strokeStyle = "white";
    context.lineCap = "round";
    context.lineJoin = "round";
    contextRef.current = context;
  });

  // if (chosen === "eraser") {
  //   context.lineWidth = 20;
  // } else if (chosen === "pencil") {
  //   context.lineWidth = 3;
  // }
  // contextRef.current = context;
  // }, [color, chosen]);

  // starts drawing
  const startDrawing = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const { offsetX, offsetY } = e.nativeEvent;
    contextRef.current?.beginPath();
    contextRef.current?.moveTo(offsetX, offsetY);
    contextRef.current?.lineTo(offsetX, offsetY);
    contextRef.current?.stroke();
    setDrawing(true);
    e.preventDefault();
  };

  // continue drawing
  const draw = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const penTouching =
      e.pointerType === "pen" ? e.pressure > 0 : e.buttons === 1;

    if (!isDrawing || !penTouching || !contextRef.current) return;
    else if (props.activeTool == "Pencil") {contextRef.current.globalCompositeOperation = "source-over" }  
    else if (props.activeTool == "Eraser") {contextRef.current.globalCompositeOperation = "destination-out"}

    const { offsetX, offsetY } = e.nativeEvent;
    contextRef.current?.lineTo(offsetX, offsetY);
    contextRef.current?.stroke();
    e.preventDefault();
  };

  // stop drawing
  const stopDrawing = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!e) return;
    contextRef.current?.closePath();
    setDrawing(false);
  };
  return (
    <>
      <canvas
        className="whiteboardCanvas"
        ref={canvasRef}
        onPointerDown={startDrawing}
        onPointerMove={draw}
        onPointerUp={stopDrawing}
      ></canvas>
    </>
  );
}

export default Whiteboard;

import { useRef, useState, useEffect } from "react";
import type { ToolProps } from "./types";

function Whiteboard(props: ToolProps) {
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

    if (props.activeTool == "Pencil") {
      context.lineWidth = 4;
    } else if (props.activeTool == "Eraser") {
      context.lineWidth = 20;
    }
    context.lineCap = "round";
    context.strokeStyle = props.colorValue;
    context.lineCap = "round";
    context.lineJoin = "round";
    contextRef.current = context;
  });



  const [clickedPosition, setClickedPosition] = useState({ x: 0, y: 0 });

  const clickedLocation = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const { clientX, clientY } = event;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();

    setClickedPosition({ x: clientX - rect.left, y: clientY - rect.top });
    console.log(clickedPosition.x,"+", clickedPosition.x);
  }


  //  this paste the image in canvas
  useEffect(() => {
    const handlePaste = (event: ClipboardEvent) => {
      const items = event.clipboardData?.items;
      if (!items) return;

      for (const item of items) {
        if (item.type.startsWith("image/")) {
          const file = item.getAsFile();
          if (!file) return;

          const img = new Image();
          img.onload = () => {
            const canvas = canvasRef.current;
            if (!canvas) return;

            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            // img: the image pasting
            // first and second value => position
            // third and fourth value => size
            ctx.drawImage(img, clickedPosition.x, clickedPosition.y);
            console.log(clickedPosition.x , "+" , clickedPosition.y)
          };

          img.src = URL.createObjectURL(file);
        }
      }
    };

    window.addEventListener("paste", handlePaste);
    return () => window.removeEventListener("paste", handlePaste);
  }, [clickedPosition]);

  // starts drawing
  const startDrawing = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (props.activeTool != "Pencil" && props.activeTool != "Eraser") return;
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
    else if (props.activeTool == "Pencil") {
      contextRef.current.globalCompositeOperation = "source-over";
    } else if (props.activeTool == "Eraser") {
      contextRef.current.globalCompositeOperation = "destination-out";
    } else return;
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
        onClick={clickedLocation}
      ></canvas>
    </>
  );
}

export default Whiteboard;

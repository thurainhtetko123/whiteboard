export type ToolProps = {
    activeTool: string;
    setActiveTool: React.Dispatch<React.SetStateAction<string>>;

    colorValue: string;
    setColorValue:React.Dispatch<React.SetStateAction<string>>;
};
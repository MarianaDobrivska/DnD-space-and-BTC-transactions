import { MouseEvent } from "react";

interface ResizeHandleProps {
  direction: string;
  onMouseDown: (e: MouseEvent) => void;
}

const ResizeHandle = ({ direction, onMouseDown }: ResizeHandleProps) => {
  const getClasses = () => {
    switch (direction) {
      case "e":
        return "absolute right-[-5px] top-1/2 transform -translate-y-1/2 w-[10px] h-[50%] cursor-ew-resize";
      case "s":
        return "absolute bottom-[-5px] left-1/2 transform -translate-x-1/2 w-[50%] h-[10px] cursor-s-resize";
      case "se":
        return "absolute right-[-5px] bottom-[-5px] w-[10px] h-[10px] cursor-se-resize";
      case "w":
        return "absolute left-[-5px] top-1/2 transform -translate-y-1/2 w-[10px] h-[50%] cursor-w-resize";
      case "n":
        return "absolute top-[-5px] left-1/2 transform -translate-x-1/2 w-[50%] h-[10px] cursor-n-resize";
      case "sw":
        return "absolute left-[-5px] bottom-[-5px] w-[10px] h-[10px] cursor-sw-resize";
      case "ne":
        return "absolute right-[-5px] top-[-5px] w-[10px] h-[10px] cursor-ne-resize";
      case "nw":
        return "absolute left-[-5px] top-[-5px] w-[10px] h-[10px] cursor-nw-resize";
      default:
        return "";
    }
  };

  return (
    <div
      className={`resize-handle ${getClasses()}`}
      onMouseDown={onMouseDown}
    />
  );
};

export default ResizeHandle;

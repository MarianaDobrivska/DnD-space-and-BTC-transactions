import { MouseEvent } from "react";
import ResizeHandle from "./ResizeHandle";

interface BlockType {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
  visible: boolean;
}

interface BlockProps {
  block: BlockType;
  onMouseDown: (
    e: MouseEvent,
    id: number,
    action: "drag" | "resize",
    direction?: string
  ) => void;
  onDelete: (id: number) => void;
}

const Block = ({ block, onMouseDown, onDelete }: BlockProps) => {
  return (
    <div
      className="absolute flex justify-center items-center text-xl font-bold text-gray-800 cursor-grab select-none bg-white border border-gray-300 shadow-md"
      style={{
        left: `${block.x}px`,
        top: `${block.y}px`,
        width: `${block.width}px`,
        height: `${block.height}px`,
        zIndex: block.zIndex,
      }}
      onMouseDown={(e) => onMouseDown(e, block.id, "drag")}>
      {block.id}

      <ResizeHandle
        direction="e"
        onMouseDown={(e) => onMouseDown(e, block.id, "resize", "e")}
      />
      <ResizeHandle
        direction="s"
        onMouseDown={(e) => onMouseDown(e, block.id, "resize", "s")}
      />
      <ResizeHandle
        direction="se"
        onMouseDown={(e) => onMouseDown(e, block.id, "resize", "se")}
      />
      <ResizeHandle
        direction="w"
        onMouseDown={(e) => onMouseDown(e, block.id, "resize", "w")}
      />
      <ResizeHandle
        direction="n"
        onMouseDown={(e) => onMouseDown(e, block.id, "resize", "n")}
      />
      <ResizeHandle
        direction="sw"
        onMouseDown={(e) => onMouseDown(e, block.id, "resize", "sw")}
      />
      <ResizeHandle
        direction="ne"
        onMouseDown={(e) => onMouseDown(e, block.id, "resize", "ne")}
      />
      <ResizeHandle
        direction="nw"
        onMouseDown={(e) => onMouseDown(e, block.id, "resize", "nw")}
      />

      <button
        className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex justify-center items-center cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          onDelete(block.id);
        }}>
        ×
      </button>
    </div>
  );
};

export default Block;

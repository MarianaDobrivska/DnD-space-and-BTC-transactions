import { useState, useEffect, MouseEvent, useRef } from "react";

/**
 * Custom hook for managing draggable and resizable blocks in a workspace.
 *
 * This hook provides functionality to create, move, resize, delete, and persist
 * block positions using localStorage. It handles mouse events for dragging and resizing,
 * ensuring smooth interaction.
 *
 * @returns {Object} - Hook state and methods
 * @property {BlockType[]} blocks - Array of block objects with position and size
 * @property {Function} handleBlockMouseDown - Handles initiating drag or resize on mouse down
 * @property {Function} handleMouseMove - Handles updating block position or size on mouse move
 * @property {Function} handleMouseUp - Handles ending drag or resize on mouse up
 * @property {Function} deleteBlock - Marks a block as hidden
 * @property {Function} resetBlocks - Resets blocks to the initial state
 */

export const useBlocksManager = () => {
  const [blocks, setBlocks] = useState<BlockType[]>([]);
  const activeBlock = useRef<number | null>(null);
  const isDragging = useRef(false);
  const isResizing = useRef(false);
  const resizeDirection = useRef<string | null>(null);
  const startPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const savedBlocks = localStorage.getItem("workspace-blocks");

    if (savedBlocks) {
      setBlocks(JSON.parse(savedBlocks));
    } else {
      setBlocks(createInitialBlocks());
    }
  }, []);

  useEffect(() => {
    if (blocks.length > 0) {
      localStorage.setItem("workspace-blocks", JSON.stringify(blocks));
    }
  }, [blocks]);

  const createInitialBlocks = (): BlockType[] => {
    return Array.from({ length: 5 }, (_, i) => ({
      id: i + 1,
      x: 10 + i * 30,
      y: 10 + i * 30,
      width: 100,
      height: 100,
      zIndex: i + 1,
      visible: true,
    }));
  };

  const handleBlockMouseDown = (
    e: MouseEvent,
    id: number,
    action: "drag" | "resize",
    direction?: string
  ) => {
    e.stopPropagation();
    e.preventDefault();

    bringToFront(id);

    if (action === "drag") {
      isDragging.current = true;
      activeBlock.current = id;
    } else if (action === "resize" && direction) {
      isResizing.current = true;
      activeBlock.current = id;
      resizeDirection.current = direction;
    }

    startPos.current = {
      x: e.clientX,
      y: e.clientY,
    };
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!activeBlock.current) return;

    const deltaX = e.clientX - startPos.current.x;
    const deltaY = e.clientY - startPos.current.y;

    setBlocks((prevBlocks) => {
      return prevBlocks.map((block) => {
        if (block.id === activeBlock.current) {
          if (isDragging.current) {
            return {
              ...block,
              x: block.x + deltaX,
              y: block.y + deltaY,
            };
          } else if (isResizing.current) {
            return handleResize(block, deltaX, deltaY);
          }
        }
        return block;
      });
    });

    startPos.current = {
      x: e.clientX,
      y: e.clientY,
    };
  };

  const handleResize = (
    block: BlockType,
    deltaX: number,
    deltaY: number
  ): BlockType => {
    let newWidth = block.width;
    let newHeight = block.height;
    let newX = block.x;
    let newY = block.y;

    switch (resizeDirection.current) {
      case "e": // East (right)
        newWidth = Math.max(50, block.width + deltaX);
        break;
      case "s": // South (bottom)
        newHeight = Math.max(50, block.height + deltaY);
        break;
      case "se": // Southeast (bottom-right corner)
        newWidth = Math.max(50, block.width + deltaX);
        newHeight = Math.max(50, block.height + deltaY);
        break;
      case "w": // West (left)
        newWidth = Math.max(50, block.width - deltaX);
        newX = block.x + deltaX;
        break;
      case "n": // North (top)
        newHeight = Math.max(50, block.height - deltaY);
        newY = block.y + deltaY;
        break;
      case "sw": // Southwest (bottom-left corner)
        newWidth = Math.max(50, block.width - deltaX);
        newHeight = Math.max(50, block.height + deltaY);
        newX = block.x + deltaX;
        break;
      case "ne": // Northeast (top-right corner)
        newWidth = Math.max(50, block.width + deltaX);
        newHeight = Math.max(50, block.height - deltaY);
        newY = block.y + deltaY;
        break;
      case "nw": // Northwest (top-left corner)
        newWidth = Math.max(50, block.width - deltaX);
        newHeight = Math.max(50, block.height - deltaY);
        newX = block.x + deltaX;
        newY = block.y + deltaY;
        break;
    }

    return {
      ...block,
      width: newWidth,
      height: newHeight,
      x: newX,
      y: newY,
    };
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    isResizing.current = false;
    activeBlock.current = null;
    resizeDirection.current = null;
  };

  const bringToFront = (id: number) => {
    setBlocks((prevBlocks) => {
      const maxZ = Math.max(...prevBlocks.map((b) => b.zIndex));
      return prevBlocks.map((block) =>
        block.id === id && block.zIndex !== maxZ
          ? { ...block, zIndex: maxZ + 1 }
          : block
      );
    });
  };

  const deleteBlock = (id: number) => {
    setBlocks((prevBlocks) =>
      prevBlocks.map((block) =>
        block.id === id ? { ...block, visible: false } : block
      )
    );
  };

  const resetBlocks = () => {
    const initialBlocks = createInitialBlocks();
    setBlocks(initialBlocks);
    localStorage.setItem("workspace-blocks", JSON.stringify(initialBlocks));
  };

  return {
    blocks,
    handleBlockMouseDown,
    handleMouseMove,
    handleMouseUp,
    deleteBlock,
    resetBlocks,
  };
};

interface BlockType {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
  visible: boolean;
}

"use client";

import { useBlocksManager } from "@/hooks/useBlocksManager";

import WorkspaceContainer from "@/components/workspace/WorkspaceContainer";
import Block from "@/components/workspace/Block";
import ResetButton from "@/components/workspace/ResetButton";

const Workspace = () => {
  const {
    blocks,
    handleBlockMouseDown,
    handleMouseMove,
    handleMouseUp,
    deleteBlock,
    resetBlocks,
  } = useBlocksManager();

  return (
    <WorkspaceContainer
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}>
      {blocks
        .filter((block) => block.visible)
        .map((block) => (
          <Block
            key={block.id}
            block={block}
            onMouseDown={handleBlockMouseDown}
            onDelete={deleteBlock}
          />
        ))}

      <ResetButton onClick={resetBlocks} />
    </WorkspaceContainer>
  );
};

export default Workspace;

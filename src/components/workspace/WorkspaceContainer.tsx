import { ReactNode, MouseEvent } from "react";

interface WorkspaceContainerProps {
  children: ReactNode;
  onMouseMove: (e: MouseEvent) => void;
  onMouseUp: () => void;
  onMouseLeave: () => void;
}

const WorkspaceContainer = ({
  children,
  onMouseMove,
  onMouseUp,
  onMouseLeave,
}: WorkspaceContainerProps) => {
  return (
    <div
      className="relative w-full h-[calc(100vh-72px)] overflow-hidden bg-gray-100"
      style={{
        backgroundImage:
          "linear-gradient(#ddd 1px, transparent 1px), linear-gradient(90deg, #ddd 1px, transparent 1px)",
        backgroundSize: "10px 10px",
      }}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave}>
      {children}
    </div>
  );
};

export default WorkspaceContainer;

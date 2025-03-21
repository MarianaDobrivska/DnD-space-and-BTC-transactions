interface ResetButtonProps {
  onClick: () => void;
}

const ResetButton = ({ onClick }: ResetButtonProps) => {
  return (
    <button
      className="absolute right-5 bottom-5 px-4 py-2 bg-blue-500 text-white border-none rounded cursor-pointer text-base"
      onClick={onClick}>
      Reset
    </button>
  );
};

export default ResetButton;

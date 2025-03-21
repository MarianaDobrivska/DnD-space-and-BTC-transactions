type ActionButtonsProps = {
  isConnected: boolean;
  connect: () => void;
  disconnect: () => void;
  resetTransactions: () => void;
};

export default function ActionButtons({
  connect,
  disconnect,
  resetTransactions,
  isConnected,
}: ActionButtonsProps) {
  return (
    <div className="flex gap-6 justify-center items-center mt-6">
      <button
        onClick={connect}
        disabled={!!isConnected}
        className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700">
        Start
      </button>
      <button
        onClick={disconnect}
        className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700">
        Stop
      </button>
      <button
        onClick={resetTransactions}
        className="bg-yellow-400 text-white px-6 py-2 rounded-md hover:bg-yellow-500">
        Reset
      </button>
    </div>
  );
}

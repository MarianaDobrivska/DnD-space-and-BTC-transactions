"use client";
import { useEffect } from "react";

import { useBitcoinTransactions } from "@/hooks/useBitcoinTransactions";

import ActionButtons from "@/components/transactions/ActionButtons";
import TransactionsTable from "@/components/transactions/TransactionsTable";

export default function Transactions() {
  const {
    connect,
    disconnect,
    resetTransactions,
    isConnected,
    transactions,
    error,
    totalAmount,
  } = useBitcoinTransactions();

  useEffect(() => {
    return () => {
      disconnect();
    };
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <ActionButtons
        connect={connect}
        disconnect={disconnect}
        resetTransactions={resetTransactions}
      />

      <div className="mb-6">
        {error && <div className="mt-2 text-red-500">{error}</div>}
      </div>

      <div>
        {transactions.length === 0 && !isConnected ? (
          <div className="text-gray-500 italic">
            No transactions received yet. Click &quot;Start&quot; to begin.
          </div>
        ) : (
          <>
            <h2 className="text-center font-bold text-2xl mb-3 mt-6">
              Sum = {totalAmount.toFixed(5)}
            </h2>
            <TransactionsTable transactions={transactions} />
          </>
        )}
      </div>
    </div>
  );
}

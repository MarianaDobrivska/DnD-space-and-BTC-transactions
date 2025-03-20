import { useState, useRef, useEffect, useCallback } from "react";
import debounce from "lodash.debounce";
import throttle from "lodash.throttle";

/**
 * Custom hook for monitoring Bitcoin transactions via WebSocket.
 * It connects to the Blockchain.com WebSocket API to receive real-time unconfirmed transaction updates.
 * Transactions are processed and stored with throttling and debouncing optimizations for performance.
 *
 * @returns {Object} - Hook state and methods
 * @property {boolean} isConnected - Boolean indicating whether the WebSocket connection is active
 * @property {ITransaction[]} transactions - Array of recent transactions
 * @property {string | null} error - Error message, if any, related to the WebSocket connection
 * @property {number} totalAmount - The total amount of Bitcoin from the displayed transactions
 * @property {Function} connect - Function to establish the WebSocket connection
 * @property {Function} disconnect - Function to close the WebSocket connection
 * @property {Function} resetTransactions - Function to reset the transaction list and total amount
 */

export const useBitcoinTransactions = () => {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [error, setError] = useState<string | null>(null);

  const totalAmount = useRef<number>(0);
  const wsRef = useRef<WebSocket | null>(null);
  const pendingTransactionsRef = useRef<ITransaction[]>([]);

  const updateTransactions = useCallback(
    throttle((newTransaction: ITransaction) => {
      setTransactions((prev) => {
        const updatedTransactions = [newTransaction, ...prev.slice(0, 99)];
        totalAmount.current += +newTransaction.amount;
        return updatedTransactions;
      });
    }, 500),
    []
  );

  const flushPendingTransactions = useCallback(
    debounce(() => {
      if (pendingTransactionsRef.current.length > 0) {
        setTransactions((prev) => {
          const updatedTransactions = [
            ...pendingTransactionsRef.current,
            ...prev.slice(0, 100 - pendingTransactionsRef.current.length),
          ];
          const totalSum = updatedTransactions.reduce(
            (sum, tx) => sum + tx.amount,
            0
          );
          totalAmount.current = +totalSum;
          return updatedTransactions;
        });
        pendingTransactionsRef.current = [];
      }
    }, 500),
    []
  );

  const formatTransaction = useCallback(
    (tx: IWebSocketData["x"]): ITransaction => {
      return {
        hash: tx.hash,
        time: new Date().toLocaleTimeString(),
        amount:
          tx.out.reduce((sum, output) => sum + (output.value || 0), 0) /
          100000000,
        fromAddress:
          tx.inputs
            .map((input) => input.prev_out?.addr || "Unknown")
            .filter((addr, index, self) => self.indexOf(addr) === index)[0] ||
          "Unknown",
        toAddress:
          tx.out
            .map((output) => output.addr || "Unknown")
            .filter((addr, index, self) => self.indexOf(addr) === index)[0] ||
          "Unknown",
      };
    },
    []
  );

  const handleMessage = useCallback((event: MessageEvent) => {
    try {
      const data = JSON.parse(event.data) as IWebSocketData;
      if (data.op === "utx") {
        const formattedTx = formatTransaction(data.x);

        // If we're getting many transactions quickly, batch them
        if (pendingTransactionsRef.current.length > 5) {
          pendingTransactionsRef.current.push(formattedTx);
          flushPendingTransactions();
        } else {
          // For fewer transactions, update immediately with throttling
          updateTransactions(formattedTx);
        }
      }
    } catch (err) {
      console.error("Error processing message:", err);
    }
  }, []);

  const connect = useCallback(() => {
    if (wsRef.current) {
      wsRef.current.close();
    }

    try {
      wsRef.current = new WebSocket("wss://ws.blockchain.info/inv");

      wsRef.current.onopen = () => {
        setIsConnected(true);
        setError(null);

        if (wsRef.current) {
          wsRef.current.send(
            JSON.stringify({
              op: "unconfirmed_sub",
            })
          );
        }

        console.log("Connected to Blockchain.com WebSocket API");
      };

      wsRef.current.onmessage = handleMessage;

      wsRef.current.onerror = (error: Event) => {
        console.error("WebSocket Error:", error);
        setError("Error connecting to Blockchain.com WebSocket API");
        setIsConnected(false);
      };

      wsRef.current.onclose = () => {
        console.log("WebSocket connection closed");
        setIsConnected(false);
      };
    } catch (err) {
      console.error("Failed to connect to WebSocket:", err);
      setError(
        `Failed to connect: ${err instanceof Error ? err.message : String(err)}`
      );
      setIsConnected(false);
    }
  }, []);

  const disconnect = useCallback(() => {
    if (wsRef.current) {
      try {
        wsRef.current.send(
          JSON.stringify({
            op: "unconfirmed_unsub",
          })
        );
      } catch (err) {
        console.error("Error unsubscribing:", err);
      }

      wsRef.current.close();
      wsRef.current = null;
      setIsConnected(false);
    }
  }, []);

  const resetTransactions = useCallback(() => {
    setTransactions([]);
    pendingTransactionsRef.current = [];
    totalAmount.current = 0;
  }, []);

  useEffect(() => {
    return () => {
      disconnect();
      updateTransactions.cancel();
      flushPendingTransactions.cancel();
    };
  }, [disconnect, updateTransactions, flushPendingTransactions]);

  return {
    isConnected,
    transactions,
    error,
    totalAmount: totalAmount.current,

    connect,
    disconnect,
    resetTransactions,
  };
};

export interface ITransaction {
  hash: string;
  time: string;
  amount: number;
  fromAddress: string;
  toAddress: string;
}

interface IWebSocketData {
  op: string;
  x: {
    hash: string;
    out: Array<{
      value: number;
      addr?: string;
    }>;
    inputs: Array<{
      prev_out?: {
        addr?: string;
      };
    }>;
  };
}

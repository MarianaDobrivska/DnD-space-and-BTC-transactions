import { ITransaction } from "@/hooks/useBitcoinTransactions";

export default function TransactionsTable({
  transactions,
}: {
  transactions: ITransaction[];
}) {
  return (
    <div className="border rounded-lg overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-bold text-gray-500 uppercase tracking-wider">
              From
            </th>
            <th className="px-6 py-3 text-left text-sm font-bold text-gray-500 uppercase tracking-wider">
              To
            </th>
            <th className="px-6 py-3 text-left text-sm font-bold text-gray-500 uppercase tracking-wider">
              Sum
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 text-gray-500">
          {transactions.map((tx) => (
            <tr key={tx.hash} className="hover:bg-gray-50">
              <td className="px-6 py-4 text-sm">
                <span
                  className="truncate block max-w-[120px] sm:max-w-full"
                  title={tx.fromAddress}>
                  {tx.fromAddress}
                </span>
              </td>
              <td className="px-6 py-4 text-sm font-mono">
                <span
                  className="truncate block max-w-[120px] sm:max-w-full"
                  title={tx.toAddress}>
                  {tx.toAddress}
                </span>
              </td>
              <td className="px-6 py-4 text-sm">{tx.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

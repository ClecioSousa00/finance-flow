import { GroupedTransaction, Transaction } from '@/types/transactionProps'

const monthNames: { [key: string]: string } = {
  '01': 'janeiro',
  '02': 'fevereiro',
  '03': 'março',
  '04': 'abril',
  '05': 'maio',
  '06': 'junho',
  '07': 'julho',
  '08': 'agosto',
  '09': 'setembro',
  '10': 'outubro',
  '11': 'novembro',
  '12': 'dezembro',
}

export const groupedTransactionsMonths = (
  transactions: Transaction[],
): GroupedTransaction[] => {
  const groupedTransactions = transactions.reduce<
    Record<string, GroupedTransaction>
  >((acc, transaction) => {
    const month = transaction.month
    const monthName = monthNames[month]

    if (!acc[month]) {
      acc[month] = {
        month: monthName,
        transactions: [],
      }
    }

    acc[month].transactions.push(transaction)
    return acc
  }, {})

  const sortedTransactions = Object.values(groupedTransactions).sort(
    (a, b) => parseInt(a.month) - parseInt(b.month),
  )

  return sortedTransactions
}

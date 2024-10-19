import { GroupedTransaction, Transaction } from '@/types/transactionProps'
import { getDayFromDate } from './DateFormat'

export const monthNames: Record<string, string> = {
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
    const monthId = transaction.month
    // const monthName = monthNames[monthId]

    if (!acc[monthId]) {
      acc[monthId] = {
        title: monthId,
        data: [],
      }
    }

    acc[monthId].data.push(transaction)
    return acc
  }, {})

  const sortedTransactions = Object.values(groupedTransactions).sort(
    (a, b) => parseInt(a.title) - parseInt(b.title),
  )

  sortedTransactions.forEach((dataTransaction) => {
    dataTransaction.data.sort((transactionA, transactionB) => {
      const dayTransactionA = parseInt(getDayFromDate(transactionA.fullDate))
      const dayTransactionB = parseInt(getDayFromDate(transactionB.fullDate))
      return dayTransactionA - dayTransactionB
    })
  })

  return sortedTransactions
}

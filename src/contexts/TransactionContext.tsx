import { createContext, ReactNode, useContext, useState } from 'react'
import { Transaction } from '@/types/transactionProps'

type TransactionContextProps = {
  dataTransactions: Transaction[] | null
  setDataTransactionsList: (transactions: Transaction[]) => void
}

export const TransactionContext = createContext({} as TransactionContextProps)

export const TransactionProvider = ({ children }: { children: ReactNode }) => {
  const [dataTransactions, setDataTransactions] = useState<
    Transaction[] | null
  >(null)

  const setDataTransactionsList = (transactions: Transaction[]) => {
    setDataTransactions(transactions)
  }

  console.log('context', dataTransactions?.length)

  return (
    <TransactionContext.Provider
      value={{ dataTransactions, setDataTransactionsList }}
    >
      {children}
    </TransactionContext.Provider>
  )
}

export const useTransactionContext = () => useContext(TransactionContext)

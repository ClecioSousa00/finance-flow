import { useCallback, useEffect, useState } from 'react'

import { useUser } from '@/contexts/userContext'

import { UserActions } from '@/services/actions/userActions'

import {
  formatDate,
  getCurrentWeekDays,
  getDayFromDate,
} from '@/utils/DateFormat'

import { DateOptionsProps } from '@/types/dateOptionsProps'
import { Transaction } from '@/types/transactionProps'
import { useTransactionContext } from '@/contexts/TransactionContext'

const initialOptionDateIdSelected = '2'

const dateOptions: DateOptionsProps[] = [
  {
    name: 'dia',
    id: '1',
    option: 'day',
  },
  {
    name: 'semana',
    id: '2',
    option: 'weekly',
  },
  {
    name: 'mês',
    id: '3',
    option: 'monthly',
  },
]

export const UseHome = () => {
  const { user } = useUser()

  const { dataTransactions, setDataTransactionsList } = useTransactionContext()

  const [transactionMonth, setTransactionMonth] = useState<Transaction[]>([])
  const [transactionListDate, setTransactionListDate] = useState<Transaction[]>(
    [],
  )
  const [optionDateSelected, setOptionDateSelected] = useState(
    initialOptionDateIdSelected,
  )

  const handleOptionDate = (dateOption: DateOptionsProps) => {
    setOptionDateSelected(dateOption.id)
    handleTransactionListDate(dateOption)
  }

  const handleDeleteTransaction = async (transaction: Transaction) => {
    if (!dataTransactions) return
    const { month } = formatDate()
    await UserActions.deleteTransactionAction(transaction, user)
    const filterTransaction = dataTransactions.filter(
      (item) => item.id !== transaction.id,
    )
    const filterTransactionsMonth = filterTransaction.filter(
      (transaction) => transaction.month === month,
    )
    setDataTransactionsList(filterTransaction)
    setTransactionMonth(filterTransactionsMonth)
  }

  const handleTransactionListDate = useCallback(
    (dateOption: DateOptionsProps) => {
      if (!transactionMonth.length) return

      if (dateOption.option === 'day') {
        const { day } = formatDate()
        console.log(day)

        const transactionsDay = transactionMonth.filter(
          (item) => getDayFromDate(item.fullDate) === day,
        )
        console.log(transactionsDay)
        setTransactionListDate(transactionsDay)
        return
      }

      if (dateOption.option === 'weekly') {
        const weeklyDays = getCurrentWeekDays()
        console.log(weeklyDays)

        const transactionsWeekly = transactionMonth.filter((item) =>
          weeklyDays.includes(getDayFromDate(item.fullDate)),
        )
        console.log(transactionsWeekly)
        setTransactionListDate(transactionsWeekly)
        return
      }

      if (dateOption.option === 'monthly') {
        const { month } = formatDate()
        console.log(month)
        const transactionsMonthly = transactionMonth.filter(
          (item) => item.month === month,
        )
        console.log(transactionsMonthly)
        setTransactionListDate(transactionsMonthly)
      }
    },
    [transactionMonth],
  )

  useEffect(() => {
    if (transactionMonth) {
      console.log('executou handleTransactionListDate(dateOptions[1])')

      handleTransactionListDate(dateOptions[1])
    }
  }, [transactionMonth, handleTransactionListDate])

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!user) return
      console.log('Fetching transactions...')

      const { month, year } = formatDate()
      const transactions = await UserActions.getTransactionAction(user, year)

      const filterTransactions = transactions.filter(
        (transaction) => transaction.month === month,
      )

      setTransactionMonth(filterTransactions)
      setDataTransactionsList(transactions)
    }

    fetchTransactions()
  }, [user])

  // useFocusEffect(
  //   useCallback(() => {
  //     const fetchTransactions = async () => {
  //       if (!user) return
  //       console.log('Fetching transactions...')

  //       const { month, year } = formatDate()
  //       const transactions = await UserActions.getTransactionAction(user, year)

  //       const filterTransactions = transactions.filter(
  //         (transaction) => transaction.month === month,
  //       )
  //       handleTransactionListDate(dateOptions[1])
  //       setTransactionMonth(filterTransactions)
  //       setDataTransactionsList(transactions)
  //     }

  //     fetchTransactions()
  //   }, [user]),
  // )

  return {
    handleOptionDate,
    optionDateSelected,
    dataTransactions,
    transactionListDate,
    dateOptions,
    handleDeleteTransaction,
  }
}

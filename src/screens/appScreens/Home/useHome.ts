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
const initialOptionDateIdSelected = dateOptions[1].id

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

      console.log('chegou', dateOption)

      if (dateOption.option === 'day') {
        const { day } = formatDate()
        console.log('entrou no dia', day)

        const transactionsDay = transactionMonth.filter(
          (item) => getDayFromDate(item.fullDate) === day,
        )
        console.log(transactionsDay)
        setTransactionListDate(transactionsDay)
        return
      }

      if (dateOption.option === 'weekly') {
        const weeklyDays = getCurrentWeekDays()
        console.log('entrou no semana', weeklyDays)

        const transactionsWeekly = transactionMonth.filter((item) =>
          weeklyDays.includes(getDayFromDate(item.fullDate)),
        )
        console.log(transactionsWeekly)
        setTransactionListDate(transactionsWeekly)
        return
      }

      if (dateOption.option === 'monthly') {
        const { month } = formatDate()
        console.log('entrou no mes', month)
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
      setOptionDateSelected(initialOptionDateIdSelected)
      handleTransactionListDate(dateOptions[1])
    }
  }, [transactionMonth, handleTransactionListDate])

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!user) return
      console.log('Fetching transactions...')

      const { year } = formatDate()
      const transactions = await UserActions.getTransactionAction(user, year)

      // const filterTransactions = transactions.filter(
      //   (transaction) => transaction.month === month,
      // )

      // setTransactionMonth(filterTransactions)
      setDataTransactionsList(transactions)
    }

    fetchTransactions()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  useEffect(() => {
    console.log('filtrando o dado do mes')

    if (dataTransactions?.length) {
      console.log('esse é o tamanho', dataTransactions.length)

      const { month } = formatDate()
      const filterTransactions = dataTransactions.filter(
        (transaction) => transaction.month === month,
      )

      setTransactionMonth(filterTransactions)
    }
  }, [dataTransactions])
  // useFocusEffect(
  //   useCallback(() => {
  //     console.log('filtrando o dado do mes')

  //     if (dataTransactions?.length) {
  //       console.log('esse é o tamanho', dataTransactions.length)

  //       const { month } = formatDate()
  //       const filterTransactions = dataTransactions.filter(
  //         (transaction) => transaction.month === month,
  //       )

  //       setTransactionMonth(filterTransactions)
  //     }
  //   }, [dataTransactions]),
  // )
  // useFocusEffect(
  //   useCallback(() => {
  //     const fetchTransactions = async () => {
  //       try {
  //         if (!user) return
  //         console.log('Fetching transactions...')

  //         const { month, year } = formatDate()
  //         const transactions = await UserActions.getTransactionAction(
  //           user,
  //           year,
  //         )

  //         const filterTransactions = transactions.filter(
  //           (transaction) => transaction.month === month,
  //         )
  //         setTransactionMonth(filterTransactions)
  //         setDataTransactionsList(transactions)
  //         setOptionDateSelected(initialOptionDateIdSelected)
  //       } catch (error) {
  //         console.error('Error fetching transactions:', error)
  //       }
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
    transactionMonth,
  }
}

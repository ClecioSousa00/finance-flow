import { useCallback, useEffect, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native'

import { useUser } from '@/contexts/userContext'

import { Transaction } from '@/services/dataBaseTypes'
import { UserActions } from '@/services/actions/userActions'

import {
  formatDate,
  getCurrentWeekDays,
  getDayFromDate,
} from '@/utils/DateFormat'

import { DateOptionsProps } from '@/types/dateOptionsProps'

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
  const [dataTransactions, setDataTransactions] = useState<
    Transaction[] | null
  >(null)
  const [transactionListDate, setTransactionListDate] = useState<Transaction[]>(
    [],
  )
  const [optionDateSelected, setOptionDateSelected] = useState(
    initialOptionDateIdSelected,
  )

  const { month, year } = formatDate()

  const handleOptionDate = (dateOption: DateOptionsProps) => {
    setOptionDateSelected(dateOption.id)
    handleTransactionListDate(dateOption)
  }

  const handleTransactionListDate = useCallback(
    (dateOption: DateOptionsProps) => {
      if (!dataTransactions) return

      if (dateOption.option === 'day') {
        const { day } = formatDate()
        console.log(day)

        const transactionsDay = dataTransactions.filter(
          (item) => getDayFromDate(item.fullDate) === day,
        )
        console.log(transactionsDay)
        setTransactionListDate(transactionsDay)
        return
      }

      if (dateOption.option === 'weekly') {
        const weeklyDays = getCurrentWeekDays()
        console.log(weeklyDays)

        const transactionsWeekly = dataTransactions.filter((item) =>
          weeklyDays.includes(getDayFromDate(item.fullDate)),
        )
        console.log(transactionsWeekly)
        setTransactionListDate(transactionsWeekly)
        return
      }

      if (dateOption.option === 'monthly') {
        const { month } = formatDate()
        console.log(month)
        const transactionsMonthly = dataTransactions.filter(
          (item) => item.month === month,
        )
        console.log(transactionsMonthly)
        setTransactionListDate(transactionsMonthly)
      }
    },
    [dataTransactions],
  )

  const getTransaction = useCallback(async () => {
    if (!user) return

    const dataTransactions = await UserActions.getTransactionAction(
      user,
      year,
      month,
    )

    setDataTransactions(dataTransactions)
  }, [user, month, year])

  useFocusEffect(
    useCallback(() => {
      getTransaction()
    }, [getTransaction]),
  )

  useEffect(() => {
    if (dataTransactions) {
      handleTransactionListDate(dateOptions[1])
    }
  }, [dataTransactions, handleTransactionListDate])

  return {
    handleOptionDate,
    optionDateSelected,
    dataTransactions,
    transactionListDate,
    dateOptions,
  }
}

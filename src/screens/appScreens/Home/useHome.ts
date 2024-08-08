import { useCallback, useEffect, useState } from 'react'

import AsyncStorage from '@react-native-async-storage/async-storage'

import Toast from 'react-native-toast-message'

import { useUser } from '@/contexts/userContext'

import { UserAccess } from '@/services/dataAccess/usersAccess'
import { Transaction } from '@/services/dataBaseTypes'

import { TotalBalanceProps } from '@/types/totalBalanceProps'

import {
  formatDate,
  getCurrentWeekDays,
  getDayFromDate,
} from '@/utils/DateFormat'
import { formattedValueInput } from '@/utils/priceFormat'

import { DateOptionsProps } from '@/types/dateOptionsProps'
import { useFocusEffect } from '@react-navigation/native'

const initialOptionDateIdSelected = '2'
const asyncStorageKey = '@financeFlow/limitValue'

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
  const [dataTransactions, setDataTransactions] = useState<Transaction[]>([])
  const [transactionListDate, setTransactionListDate] = useState<Transaction[]>(
    [],
  )
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [limitBalance, setLimitBalance] = useState('')
  const [percentageLimit, setPercentageLimit] = useState(0)
  const [optionDateSelected, setOptionDateSelected] = useState(
    initialOptionDateIdSelected,
  )
  const [totalBalanceTransactions, setTotalBalanceTransactions] = useState(
    {} as TotalBalanceProps,
  )
  const { month, year } = formatDate()

  const handleModal = () => {
    setModalIsOpen((prevState) => !prevState)
  }

  const handlePriceChange = (event: string) => {
    const value = formattedValueInput(event.replace(/\D/g, ''))
      .replace(/\./g, '')
      .replace(',', '.')
    setLimitBalance(value)
  }

  const calculateExpensesPercentage = (
    totalExpense: string,
    limit: string,
  ): number => {
    const totalSpentNumber = parseFloat(totalExpense.replace(/,/g, '.'))
    const limitNumber = parseFloat(limit.replace(/,/g, '.'))

    const percentage = (totalSpentNumber / limitNumber) * 100

    return Math.round(percentage * 100) / 100
  }

  const formattedExpense = useCallback(() => {
    const totalExpense = formattedValueInput(
      String(totalBalanceTransactions.totalExpense).replace(/\D/g, ''),
    )
      .replace(/\./g, '')
      .replace(',', '.')
    return totalExpense
  }, [totalBalanceTransactions.totalExpense])

  const setLimitValueStorage = async (limitValue: string) => {
    try {
      await AsyncStorage.setItem(asyncStorageKey, limitValue)
    } catch (e) {
      Toast.show({
        type: 'error',
        text1: 'Erro ao salvar novo limite, tente mais tarde.',
      })
    }
  }

  const getLimitValueStorage = async () => {
    try {
      const dataStorage = await AsyncStorage.getItem(asyncStorageKey)
      setLimitBalance(dataStorage || '')
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Erro ao buscar seu limite, tente mais tarde.',
      })
    }
  }

  const handleSaveLimit = () => {
    const totalExpense = formattedExpense()

    const percentage = calculateExpensesPercentage(totalExpense, limitBalance)
    setLimitValueStorage(limitBalance)
    setPercentageLimit(percentage)
    setModalIsOpen((prevState) => !prevState)
  }

  const handleOptionDate = (dateOption: DateOptionsProps) => {
    setOptionDateSelected(dateOption.id)
    handleTransactionListDate(dateOption)
  }

  const handleTransactionListDate = useCallback(
    (dateOption: DateOptionsProps) => {
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

    try {
      const dataTransactions = await UserAccess.getTransaction(
        user,
        year,
        month,
      )
      console.log(dataTransactions)

      const transactionsList: Transaction[] = dataTransactions.docs.map(
        (doc) => {
          const data = doc.data() as Transaction
          return {
            name: data.name,
            price: data.price,
            categoria: data.categoria,
            fullDate: data.fullDate,
            year: data.year,
            month: data.month,
            optionTransaction: data.optionTransaction,
          }
        },
      )

      setDataTransactions(transactionsList)

      console.log('get de transações')
    } catch (error) {
      console.log('Erro ao pegar as transações', error)
    }
  }, [user, month, year])

  const totalResume = useCallback(() => {
    const totalRent = dataTransactions.reduce((acc, item) => {
      if (item.optionTransaction === 'renda') {
        return (acc += Number(item.price.replace(/\D/g, '')))
      }
      return acc
    }, 0)
    const totalExpense = dataTransactions.reduce((acc, item) => {
      if (item.optionTransaction === 'despesa') {
        return (acc += Number(item.price.replace(/\D/g, '')))
      }
      return acc
    }, 0)
    setTotalBalanceTransactions({
      totalRent,
      totalExpense,
    })
  }, [dataTransactions])

  useFocusEffect(
    useCallback(() => {
      getTransaction()
    }, [getTransaction]),
  )

  useEffect(() => {
    if (dataTransactions.length) {
      handleTransactionListDate(dateOptions[1])
    }
  }, [dataTransactions.length, handleTransactionListDate])

  useEffect(() => {
    if (dataTransactions.length) {
      totalResume()
    }
  }, [dataTransactions, totalResume])

  useEffect(() => {
    if (totalBalanceTransactions.totalExpense) {
      const percentage = calculateExpensesPercentage(
        formattedExpense(),
        limitBalance,
      )
      setPercentageLimit(percentage)
    }
  }, [totalBalanceTransactions, limitBalance, formattedExpense])

  useEffect(() => {
    getLimitValueStorage()
  }, [])

  return {
    totalBalanceTransactions,
    handleModal,
    percentageLimit,
    limitBalance,
    modalIsOpen,
    handlePriceChange,
    handleSaveLimit,
    handleOptionDate,
    optionDateSelected,
    dataTransactions,
    transactionListDate,
    dateOptions,
  }
}

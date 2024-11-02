import { useCallback, useEffect, useState } from 'react'

import Toast from 'react-native-toast-message'

import AsyncStorage from '@react-native-async-storage/async-storage'

import { TotalBalanceProps } from '@/types/totalBalanceProps'

import { formattedValueInput } from '@/utils/priceFormat'
import { Transaction } from '@/types/transactionProps'

const asyncStorageKey = '@financeFlow/limitValue'

export const useCalculateBalanceInfos = (
  dataTransactions: Transaction[] | null,
) => {
  const [totalBalanceTransactions, setTotalBalanceTransactions] = useState(
    {} as TotalBalanceProps,
  )
  const [limitBalance, setLimitBalance] = useState('')
  const [percentageLimit, setPercentageLimit] = useState(0)
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const handleModal = () => {
    setModalIsOpen((prevState) => !prevState)
  }

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

  const totalResume = useCallback(() => {
    // if (!dataTransactions) {
    //   setTotalBalanceTransactions({
    //     totalRent: 0,
    //     totalExpense: 0,
    //   })
    // }

    if (!dataTransactions) {
      setTotalBalanceTransactions({
        totalRent: 0,
        totalExpense: 0,
      })
      return
    }

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

    console.log('resume', totalResume)
    console.log('expense', totalExpense)

    setTotalBalanceTransactions({
      totalRent,
      totalExpense,
    })
  }, [dataTransactions])

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
    if (dataTransactions) {
      totalResume()
      setIsLoading(false)
    }
  }, [dataTransactions, totalResume])

  useEffect(() => {
    getLimitValueStorage()
  }, [])

  return {
    handleModal,
    handlePriceChange,
    handleSaveLimit,
    limitBalance,
    modalIsOpen,
    percentageLimit,
    totalBalanceTransactions,
    isLoading,
  }
}

import { formatDate } from '@/utils/DateFormat'
import { ItemDropdown, monthsDropDown } from './dropDownItens'
import { useCallback, useEffect, useState } from 'react'
import { Transaction, TransactionsPieChart } from '@/types/transactionProps'
import { useTransactionContext } from '@/contexts/TransactionContext'
import { CategoryPieChartType, pieChartColors } from './pieChart'
import { CategoryType } from '@/utils/categorieincons'
import { TotalBalanceProps } from '@/types/totalBalanceProps'

type TransactionsCategoryYear = Record<CategoryType, Transaction[]>

export const UseResume = () => {
  const { year } = formatDate()
  const optionAnualDropDownMonth = monthsDropDown[0].itemDropDown

  const [dataPieChart, setDataPieChart] = useState<
    TransactionsPieChart[] | null
  >(null)
  const [selectMonthDropDown, setSelectMonthDropDown] = useState(
    optionAnualDropDownMonth,
  )
  const [selectYearDropDown, setSelectYearDropDown] = useState(year)
  const [totalBalanceTransactions, setTotalBalanceTransactions] = useState(
    {} as TotalBalanceProps,
  )
  const [isLoading, setIsLoading] = useState(true)

  const { dataTransactions } = useTransactionContext()
  // const { totalBalanceTransactions } =
  //   useCalculateBalanceInfos(dataTransactions)

  const handleSelectMonth = (itemDropDown: ItemDropdown) => {
    setSelectMonthDropDown(itemDropDown.itemDropDown)
    getTransactionsMonthSelected(itemDropDown)
  }

  const handleSelectYear = (itemDropDown: ItemDropdown) => {
    setSelectYearDropDown(itemDropDown.itemDropDown)
  }

  const getTransactionsMonthSelected = (monthSelected: ItemDropdown) => {
    if (!dataTransactions) return
    const optionAnualSelected =
      monthSelected.itemDropDown === optionAnualDropDownMonth
    if (optionAnualSelected) {
      groupCategoriesYear(dataTransactions)
      return
    }
    const transactionsMonthSelected = dataTransactions.filter(
      (transaction) => transaction.month === monthSelected.id,
    )
    groupCategoriesYear(transactionsMonthSelected)
    totalResume(transactionsMonthSelected)
  }

  const groupCategoriesYear = useCallback(
    (transactions: Transaction[]) => {
      const groupedCategories = transactions.reduce((acc, transaction) => {
        const category = transaction.categoria
        if (category === 'renda') return acc

        if (!acc[category]) {
          acc[category] = []
        }

        acc[category].push(transaction)
        return acc
      }, {} as TransactionsCategoryYear)
      // setTransactionsCategoryYear(groupedCategories)
      const dataPieChart = formattedTransactionsPieChart(groupedCategories)

      setDataPieChart(dataPieChart)
      console.log(dataPieChart)
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  const totalCategoryTransaction = (transactions: Transaction[]) => {
    return transactions.reduce((acc, transaction) => {
      return (acc += parseFloat(transaction.price))
    }, 0)
  }

  const formattedTransactionsPieChart = (
    groupedCategories: TransactionsCategoryYear,
  ): TransactionsPieChart[] => {
    const dataPieChart: TransactionsPieChart[] = Object.keys(
      groupedCategories,
    ).map((categoryKey) => {
      const transactions = groupedCategories[
        categoryKey as CategoryPieChartType
      ] as Transaction[]
      return {
        value: totalCategoryTransaction(transactions),
        // value: totalCategoryTransaction(transactions),
        color: pieChartColors[categoryKey as CategoryPieChartType],
        label: '',
        // label: categoryKey as string,
      }
    })
    return dataPieChart
  }

  const totalResume = useCallback((transactions: Transaction[] | null) => {
    if (!transactions) {
      setTotalBalanceTransactions({
        totalRent: 0,
        totalExpense: 0,
      })
      return
    }

    const totalRent = transactions.reduce((acc, item) => {
      if (item.optionTransaction === 'renda') {
        return (acc += Number(item.price.replace(/\D/g, '')))
      }
      return acc
    }, 0)

    const totalExpense = transactions.reduce((acc, item) => {
      if (item.optionTransaction === 'despesa') {
        return (acc += Number(item.price.replace(/\D/g, '')))
      }
      return acc
    }, 0)

    setTotalBalanceTransactions({
      totalRent,
      totalExpense,
    })
  }, [])

  useEffect(() => {
    if (dataTransactions) {
      groupCategoriesYear(dataTransactions)
      totalResume(dataTransactions)
      setIsLoading(false)
    }
  }, [groupCategoriesYear, dataTransactions, totalResume])

  return {
    totalBalanceTransactions,
    dataPieChart,
    selectYearDropDown,
    selectMonthDropDown,
    handleSelectYear,
    handleSelectMonth,
    isLoading,
  }
}

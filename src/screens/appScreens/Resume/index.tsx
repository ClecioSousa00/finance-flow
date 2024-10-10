import { useCallback, useEffect, useState } from 'react'

import { View } from 'react-native'

import { Container } from '@/components/Container'
import { ContainerBalanceInfos } from '@/components/ContainerBalanceInfos'
import { ContainerScreens } from '@/components/ContainerScreens'
import { HeaderAppScreen } from '@/components/HeaderAppScreen'
import { TitleScreen } from '@/components/TitleScreen'
import { useTransactionContext } from '@/contexts/TransactionContext'
import { Loading } from '@/components/Loading'
import { DropDownDate } from '@/components/DropDownDate'
import { InfoTransactionEmpty } from '@/components/InfoTransactionEmpty'
import { PieChart } from '@/components/PieChart'

import { CategoryType } from '@/utils/categorieincons'
import { formatDate } from '@/utils/DateFormat'

import { Transaction, TransactionsPieChart } from '@/types/transactionProps'

import { CategoryPieChartType, pieChartColors } from './pieChart'
import { ItemDropdown, monthsDropDown, yearsDropDown } from './dropDownItens'
import { CategoryChart } from '@/components/CategoryChart'
import { TotalBalanceProps } from '@/types/totalBalanceProps'

type TransactionsCategoryYear = Record<CategoryType, Transaction[]>

export const Resume = () => {
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

    console.log('resume', totalResume)
    console.log('expense', totalExpense)

    setTotalBalanceTransactions({
      totalRent,
      totalExpense,
    })
  }, [])

  useEffect(() => {
    console.log('executando??????????')

    if (dataTransactions) {
      groupCategoriesYear(dataTransactions)
      totalResume(dataTransactions)
    }
  }, [groupCategoriesYear, dataTransactions, totalResume])

  return (
    <ContainerScreens>
      <HeaderAppScreen className="gap-3 ">
        <TitleScreen title="balanço" />
        <ContainerBalanceInfos
          totalBalanceTransactions={totalBalanceTransactions}
        />
      </HeaderAppScreen>
      <Container>
        {!dataPieChart && <Loading />}
        {dataPieChart && (
          <>
            <View className="flex-row justify-between mb-10">
              <View className="w-2/5">
                <DropDownDate
                  className="h-16"
                  inputValue={selectYearDropDown}
                  dataDropdown={yearsDropDown}
                  handleSelectItemDropDown={handleSelectYear}
                />
              </View>
              <View className="w-2/5">
                <DropDownDate
                  inputValue={selectMonthDropDown!}
                  dataDropdown={monthsDropDown}
                  handleSelectItemDropDown={handleSelectMonth}
                />
              </View>
            </View>
            {!dataPieChart?.length && (
              <InfoTransactionEmpty message="Nenhuma transação efetuada no mês selecionado" />
            )}

            <View style={{ height: 250 }}>
              <PieChart
                dataPieChart={dataPieChart}
                totalExpense={totalBalanceTransactions.totalExpense}
              />
            </View>
            <View className=" flex-row flex-wrap w-full gap-2  justify-between  mt-6">
              {dataPieChart.map((item) => {
                const keyName = Object.keys(pieChartColors).find(
                  (key) =>
                    pieChartColors[key as CategoryPieChartType] === item.color,
                )

                return (
                  <CategoryChart
                    key={item.color}
                    categoryChart={item}
                    keyName={keyName}
                  />
                )
              })}
            </View>
          </>
        )}
      </Container>
    </ContainerScreens>
  )
}

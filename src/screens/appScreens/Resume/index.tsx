import { useCallback, useEffect, useState } from 'react'

import { View } from 'react-native'

import { Pie, PolarChart } from 'victory-native'

import { useFont } from '@shopify/react-native-skia'

import { useCalculateBalanceInfos } from '@/hooks/useCalculateBalanceInfos'

import { Container } from '@/components/Container'
import { ContainerBalanceInfos } from '@/components/ContainerBalanceInfos'
import { ContainerScreens } from '@/components/ContainerScreens'
import { HeaderAppScreen } from '@/components/HeaderAppScreen'
import { TitleScreen } from '@/components/TitleScreen'
import { useTransactionContext } from '@/contexts/TransactionContext'
import { PieChartCustomLabel } from '@/components/PieChartCustomLabel'
import { Loading } from '@/components/Loading'

import poppins from '@/assets/fonts/Poppins-Regular.ttf'

import { CategoryType } from '@/utils/categorieincons'

import { Transaction } from '@/types/transactionProps'

import { colors } from '@/styles/colors'

import { CategoryPieChartType, pieChartColors } from './pieChat'

type TransactionsCategoryYear = Record<CategoryType, Transaction[]>
type TransactionsPieChart = {
  value: number
  color: string
  label: string
}

export const Resume = () => {
  const [dataPieChart, setDataPieChart] = useState<
    TransactionsPieChart[] | null
  >(null)

  const font = useFont(poppins, 14)

  const { dataTransactions } = useTransactionContext()
  const { totalBalanceTransactions } =
    useCalculateBalanceInfos(dataTransactions)

  const groupCategoriesYear = useCallback(() => {
    if (!dataTransactions) return

    const groupedCategories = dataTransactions.reduce((acc, transaction) => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataTransactions])

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

  useEffect(() => {
    groupCategoriesYear()
  }, [groupCategoriesYear])

  return (
    <ContainerScreens>
      <HeaderAppScreen className="gap-3 ">
        <TitleScreen title="resumo anual" />
        <ContainerBalanceInfos
          totalBalanceTransactions={totalBalanceTransactions}
        />
      </HeaderAppScreen>
      <Container>
        {!dataPieChart && <Loading />}
        {dataPieChart && (
          <View style={{ height: 350 }}>
            <PolarChart
              data={dataPieChart}
              colorKey={'color'}
              valueKey={'value'}
              labelKey={'label'}
            >
              <Pie.Chart>
                {({ slice }) => {
                  return (
                    <>
                      <Pie.Slice>
                        <Pie.Label radiusOffset={0.6}>
                          {(position) => (
                            <PieChartCustomLabel
                              position={position}
                              slice={slice}
                              font={font}
                            />
                          )}
                        </Pie.Label>
                      </Pie.Slice>

                      <Pie.SliceAngularInset
                        angularInset={{
                          angularStrokeWidth: 2,
                          angularStrokeColor: colors['primary-Light'],
                        }}
                      />
                    </>
                  )
                }}
              </Pie.Chart>
            </PolarChart>
          </View>
        )}
      </Container>
    </ContainerScreens>
  )
}

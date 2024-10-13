import { View } from 'react-native'

import { Container } from '@/components/Container'
import { ContainerBalanceInfos } from '@/components/ContainerBalanceInfos'
import { ContainerScreens } from '@/components/ContainerScreens'
import { HeaderAppScreen } from '@/components/HeaderAppScreen'
import { Loading } from '@/components/Loading'
import { DropDownDate } from '@/components/DropDownDate'
import { InfoTransactionEmpty } from '@/components/InfoTransactionEmpty'
import { PieChart } from '@/components/PieChart'
import { CategoryChart } from '@/components/CategoryChart'

import { CategoryPieChartType, pieChartColors } from './pieChart'
import { UseResume } from './useResume'
import { monthsDropDown, yearsDropDown } from './dropDownItens'

export const Resume = () => {
  const {
    dataPieChart,
    handleSelectMonth,
    handleSelectYear,
    selectMonthDropDown,
    selectYearDropDown,
    totalBalanceTransactions,
  } = UseResume()

  return (
    <ContainerScreens>
      <HeaderAppScreen className="gap-3 ">
        {/* <TitleScreen title="balanço" /> */}
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
            <View className=" flex-row flex-wrap w-full gap-2 -mx-4 justify-between  mt-8">
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

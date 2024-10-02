import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { colors } from '@/styles/colors'
import Income from '@/assets/Income1.svg'
import Expense from '@/assets/Expense.svg'
import Feather from '@expo/vector-icons/Feather'
import { TotalBalanceProps } from '@/types/totalBalanceProps'
import { formatPrice } from '@/utils/priceFormat'

const styles = StyleSheet.create({
  bar: {
    height: '100%',
    width: 2,
    backgroundColor: colors.primary,
  },
  container: {
    width: '100%',
    height: 28,
    backgroundColor: colors['secondary-dark'],
    borderRadius: 14,
    marginTop: 18,
    overflow: 'hidden',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 13,
  },
  containerPercentage: {
    width: '80%',
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 14,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: 14,
  },
})

type Props = {
  totalBalanceTransactions: TotalBalanceProps
  handleModal?: () => void
  percentageLimit?: number
  limitBalance?: string
  expanseLimit?: boolean
}

const getMessageForPercentage = (percentageLimit: number) => {
  if (percentageLimit <= 25) return 'Ótimo começo!'
  if (percentageLimit <= 50) return 'parece bom.'
  if (percentageLimit <= 75) return 'Você está se aproximando do limite.'
  if (percentageLimit <= 90) return 'Cuidado com seus gastos!'
  return 'Você atingiu o limite ou está muito próximo!'
}

export const ContainerBalanceInfos = ({
  totalBalanceTransactions,
  handleModal,
  limitBalance,
  percentageLimit,
  expanseLimit = false,
}: Props) => {
  console.log('totalBalance', totalBalanceTransactions)

  const totalBalance =
    totalBalanceTransactions.totalRent - totalBalanceTransactions.totalExpense

  const message = percentageLimit
    ? getMessageForPercentage(percentageLimit)
    : ''

  return (
    <View className="w-full gap-3">
      <View className="h-[75px] w-full bg-primary items-center rounded-xl justify-center">
        <Text className="text-secondary-dark capitalize">balanço total</Text>
        <Text className="text-2xl font-poppins-semiBold text-secondary-dark">
          {`${totalBalance ? formatPrice(String(totalBalance)) : '0,00'}`}
        </Text>
      </View>
      <View className="flex-row justify-between items-center ">
        <View>
          <View className="flex-row items-center gap-1">
            <Income />
            <Text className="capitalize text-xs text-secondary-dark">
              renda total
            </Text>
          </View>
          <Text className="text-2xl text-primary font-bold">
            {totalBalanceTransactions.totalRent
              ? formatPrice(String(totalBalanceTransactions.totalRent))
              : '0,00'}
          </Text>
        </View>

        <View style={styles.bar}></View>

        <View>
          <View className="flex-row items-center gap-1">
            <Expense />
            <Text className="capitalize text-xs text-secondary-dark">
              custo total
            </Text>
          </View>
          <Text className="text-2xl font-bold text-blue-dark">
            {totalBalanceTransactions.totalExpense
              ? `-${formatPrice(String(totalBalanceTransactions.totalExpense))}`
              : '0,00'}
          </Text>
        </View>
      </View>
      {expanseLimit && limitBalance && (
        <View className="gap-3">
          <View className="w-full h-7 bg-secondary-dark rounded-xl overflow-hidden justify-between flex-row items-center">
            <Text className="text-primary text-sm font-semibold pl-3">
              {`${percentageLimit?.toFixed()}%`}
            </Text>
            <View className="w-4/5 h-full bg-primary rounded-xl flex-row justify-end items-center pr-3">
              <Text className="text-secondary-dark text-sm font-semibold">
                {`${formatPrice(limitBalance)}`}
              </Text>
            </View>
          </View>

          <View className="flex-row gap-2 items-center justify-center">
            <TouchableOpacity onPress={handleModal}>
              <Feather name="edit" size={14} color={colors['secondary-dark']} />
            </TouchableOpacity>
            {!limitBalance && (
              <Text className="text-secondary-dark text-sm capitalize">
                Adicione um limite às suas despesas
              </Text>
            )}
            {limitBalance && (
              <Text className="text-secondary-dark text-sm capitalize">
                {`${percentageLimit?.toFixed()}% de suas despesas, ${message}`}
              </Text>
            )}
          </View>
        </View>
      )}
    </View>
  )
}

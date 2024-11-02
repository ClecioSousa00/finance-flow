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
  nameBalance?: 'anual' | 'mensal'
}

const getMessageForPercentage = (percentageLimit: number) => {
  if (percentageLimit <= 25) return 'Ótimo começo!'
  if (percentageLimit <= 50) return 'Parece Bom.'
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
  nameBalance = 'mensal',
}: Props) => {
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
      <View className="flex-row justify-between items-center">
        <View className="items-center">
          <View className="flex-row items-center gap-1">
            <Income />
            <Text className="capitalize text-xs text-secondary-dark">
              {`renda ${nameBalance}`}
            </Text>
          </View>
          <Text className="text-2xl text-primary font-bold">
            {totalBalanceTransactions.totalRent
              ? formatPrice(String(totalBalanceTransactions.totalRent))
              : 'R$ 0,00'}
          </Text>
        </View>

        <View style={styles.bar}></View>

        <View className="items-center">
          <View className="flex-row items-center gap-1">
            <Expense />
            <Text className="capitalize text-xs text-secondary-dark">
              {`custo ${nameBalance}`}
            </Text>
          </View>
          <Text className="text-2xl font-bold text-danger/80">
            {totalBalanceTransactions.totalExpense
              ? `-${formatPrice(String(totalBalanceTransactions.totalExpense))}`
              : 'R$ 0,00'}
          </Text>
        </View>
      </View>

      {expanseLimit && (
        <View className="gap-3">
          <View style={styles.container}>
            <Text className="text-primary text-sm font-semibold">
              {`${percentageLimit?.toFixed()}%`}
            </Text>
            <View style={styles.containerPercentage}>
              <Text className="text-secondary-dark text-sm font-semibold">
                {`${formatPrice(limitBalance || '0')}`}
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

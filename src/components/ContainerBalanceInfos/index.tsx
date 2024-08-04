import { View, StyleSheet, Text } from 'react-native'
import { colors } from '@/styles/colors'
import Income from '@/assets/Income1.svg'
import Expense from '@/assets/Expense.svg'
import Feather from '@expo/vector-icons/Feather'

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

export const ContainerBalanceInfos = () => {
  return (
    <View className=" w-full mt-5">
      <View className="flex-row justify-between items-center">
        <View>
          <View className="flex-row items-center gap-1">
            <Income />
            <Text className="capitalize text-xs text-secondary-dark">
              balanço total
            </Text>
          </View>
          <Text className="text-2xl text-primary font-bold">R$ 7.783,00</Text>
        </View>
        <View style={styles.bar}></View>
        <View>
          <View className="flex-row items-center gap-1">
            <Expense />
            <Text className="capitalize text-xs text-secondary-dark">
              custo total
            </Text>
          </View>
          <Text
            className="text-2xl  font-bold"
            style={{ color: colors['blue-dark'] }}
          >
            -R$ 1.187,40
          </Text>
        </View>
      </View>
      <View style={styles.container}>
        <Text className="text-primary text-sm font-semibold">30%</Text>
        <View style={styles.containerPercentage}>
          <Text className="text-secondary-dark text-sm font-semibold">
            R$ 20.000,00
          </Text>
        </View>
      </View>
      <View className="flex-row gap-2 items-center justify-center mt-3">
        <Feather name="edit" size={14} color={colors['secondary-dark']} />
        <Text className="text-secondary-dark text-sm capitalize">
          30% de suas despesas, parece bom.
        </Text>
      </View>
    </View>
  )
}
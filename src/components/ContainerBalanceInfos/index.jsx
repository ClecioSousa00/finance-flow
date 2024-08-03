import { View, StyleSheet } from 'react-native'
import { BalanceInfos } from '../BalanceInfos'
import { colors } from '@/styles/colors'

const styles = StyleSheet.create({
  bar: {
    height: '100%',
    width: 2,
    backgroundColor: colors.primary,
  },
  container: {
    width: '100%',
    height: 28,
    backgroundColor: colors.primary,
  },
})

export const ContainerBalanceInfos = () => {
  return (
    <View className=" w-full">
      <View className="flex-row justify-between items-center">
        <BalanceInfos />
        <View style={styles.bar}></View>
        <BalanceInfos />
      </View>
      <View style={styles.container}></View>
    </View>
  )
}

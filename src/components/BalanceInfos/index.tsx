import { Text, View } from 'react-native'
import Income from '@/assets/Income1.svg'

export const BalanceInfos = () => {
  return (
    <View>
      <View className="flex-row items-center gap-1">
        <Income />
        <Text className="capitalize text-xs text-secondary-dark">
          despesa total
        </Text>
      </View>
      <Text className="text-2xl text-primary font-bold">R$ 7.783,00</Text>
    </View>
  )
}

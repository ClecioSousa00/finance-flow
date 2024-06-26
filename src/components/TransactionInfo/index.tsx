import { Text, TouchableOpacity, View } from 'react-native'
import { Entypo } from '@expo/vector-icons'
import { colors } from '@/styles/colors'
import Income from '@/assets/Income.svg'

export const TransactionInfo = () => {
  return (
    <TouchableOpacity className="flex-row justify-between items-center ">
      <View className="flex-row gap-2 items-center">
        <Income width={40} />
        <Text className="capitalize ">renda</Text>
      </View>
      <View className="flex-row gap-1 items-center">
        <Text className="text-success">R$ 1.000,00</Text>
        <Entypo name="chevron-small-right" size={24} color={colors.white} />
      </View>
    </TouchableOpacity>
  )
}

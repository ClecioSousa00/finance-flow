import { Text, View } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { colors } from '@/styles/colors'

type CardProps = {
  total: string
}

export const Card = ({ total }: CardProps) => {
  return (
    <View className="w-2/3 bg-primary-Light -mt-4 rounded-lg px-4 pt-4 pb-2 h-32  mx-auto">
      <View className="flex-row justify-between ">
        <Text className="text-disabled">Resumo</Text>
        <FontAwesome name="balance-scale" size={24} color={colors.disabled} />
      </View>
      <Text className="text-3xl text-center mt-3 text-white">{total}</Text>
      {/* <Text className="text-danger">- R$ 134,00</Text> */}
    </View>
  )
}

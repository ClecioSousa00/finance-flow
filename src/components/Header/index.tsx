import { Text, TouchableOpacity, View } from 'react-native'
import { Feather } from '@expo/vector-icons'

type HeaderProps = {
  title: string
}

export const Header = ({ title }: HeaderProps) => {
  return (
    <View className="mt-16 flex-row justify-center">
      <TouchableOpacity className="absolute left-0">
        <Feather name="arrow-left" size={24} color="black" />
      </TouchableOpacity>
      <Text className="font-poppins-semiBold text-lg">{title}</Text>
    </View>
  )
}

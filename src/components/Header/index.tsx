import { Text, TouchableOpacity, View } from 'react-native'
import { Feather } from '@expo/vector-icons'

export const Header = () => {
  return (
    <View className="mt-16 flex-row justify-center">
      <TouchableOpacity className="absolute left-0">
        <Feather name="arrow-left" size={24} color="black" />
      </TouchableOpacity>
      <Text className="font-poppins-semiBold text-lg">Entrar</Text>
    </View>
  )
}

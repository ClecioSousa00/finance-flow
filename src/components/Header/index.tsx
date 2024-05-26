import { Text, TouchableOpacity, View } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

type HeaderProps = {
  title: string
}

export const Header = ({ title }: HeaderProps) => {
  const navigation = useNavigation()
  return (
    <View className="mt-16 flex-row justify-center">
      <TouchableOpacity
        className="absolute left-0"
        onPress={() => navigation.goBack()}
      >
        <Feather name="arrow-left" size={24} color="black" />
      </TouchableOpacity>
      <Text className="font-poppins-semiBold text-lg">{title}</Text>
    </View>
  )
}

import { Text, TouchableOpacity, View } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { colors } from '@/styles/colors'

type HeaderProps = {
  title: string
}

export const HeaderNavigation = ({ title }: HeaderProps) => {
  const navigation = useNavigation()
  return (
    <View className="mt-16 flex-row justify-center w-full">
      <TouchableOpacity
        className="absolute left-0"
        onPress={() => navigation.goBack()}
      >
        <Feather name="arrow-left" size={24} color={colors.primary} />
      </TouchableOpacity>
      <Text className="font-poppins-semiBold text-lg capitalize text-secondary-dark">
        {title}
      </Text>
    </View>
  )
}

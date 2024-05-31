import { View, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { colors } from '@/styles/colors'

export const HeaderAppScreen = () => {
  return (
    <View className="bg-secondary  px-5 h-36 rounded-b-2xl rounded-bl-2xl flex-row items-center justify-end">
      <TouchableOpacity activeOpacity={0.7}>
        <Ionicons name="exit-outline" size={24} color={colors.white} />
      </TouchableOpacity>
    </View>
  )
}

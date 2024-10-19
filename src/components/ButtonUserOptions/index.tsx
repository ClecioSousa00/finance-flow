import { colors } from '@/styles/colors'
import { OptionsIconUser } from '@/types/iconsProps'

import { Text, TouchableOpacity, View } from 'react-native'

export const ButtonUserOptions = ({
  name,
  icon: Icon,
  handlePress,
}: OptionsIconUser) => {
  return (
    <TouchableOpacity
      className="flex-row gap-3 items-center"
      activeOpacity={0.7}
      onPress={handlePress}
    >
      <View className="bg-blue-dark w-14 h-14 rounded-[18px] justify-center items-center">
        <Icon width={32} color={colors['primary-Light']} />
      </View>
      <Text className="text-disabled text-lg capitalize">{name}</Text>
    </TouchableOpacity>
  )
}

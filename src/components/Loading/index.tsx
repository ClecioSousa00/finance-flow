import { colors } from '@/styles/colors'
import { ActivityIndicator, View } from 'react-native'

export const Loading = () => {
  return (
    <View className="flex-1 justify-center items-center">
      <ActivityIndicator size={'large'} color={colors['secondary-dark']} />
    </View>
  )
}

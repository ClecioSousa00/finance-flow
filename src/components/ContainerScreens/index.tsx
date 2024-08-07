import { View } from 'react-native'

export const ContainerScreens = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return <View className="flex-1 bg-secondary">{children}</View>
}

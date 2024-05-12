import { View } from 'react-native'

export const ContainerScreens = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return <View className="flex-1 px-4">{children}</View>
}

import { View } from 'react-native'

type Props = {
  children: React.ReactNode
}

export const ModalContent = ({ children }: Props) => {
  return (
    <View className="w-80 h-80 bg-primary px-7 items-center py-9  rounded-3xl">
      {children}
    </View>
  )
}

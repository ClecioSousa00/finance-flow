import { ContainerScreens } from '@/components/ContainerScreens'
import { Header } from '@/components/Header'
import { View } from 'react-native'

export const Login = () => {
  return (
    <ContainerScreens>
      <View className="flex-1">
        <Header />
      </View>
    </ContainerScreens>
  )
}

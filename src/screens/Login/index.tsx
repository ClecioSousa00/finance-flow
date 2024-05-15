import { Button } from '@/components/Button/Button'
import { ContainerScreens } from '@/components/ContainerScreens'
import { Header } from '@/components/Header'
import { AuthRouteProps } from '@/routes/auth.route'
import { useNavigation } from '@react-navigation/native'
import { View } from 'react-native'

export const Login = () => {
  const navigation = useNavigation<AuthRouteProps>()
  return (
    <ContainerScreens>
      <View className="flex-1">
        <Header title="Entrar" />
        <Button
          label="Ir para registro"
          onPress={() => navigation.navigate('register')}
        />
      </View>
    </ContainerScreens>
  )
}

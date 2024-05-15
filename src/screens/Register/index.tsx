import { Text, View } from 'react-native'

import { ContainerScreens } from '@/components/ContainerScreens'
import { Header } from '@/components/Header'
import { Input } from '@/components/Input'
import { Button } from '@/components/Button/Button'
import { useNavigation } from '@react-navigation/native'
import { AuthRouteProps } from '@/routes/auth.route'

export const Register = () => {
  const navigation = useNavigation<AuthRouteProps>()
  return (
    <ContainerScreens>
      <View className="flex-1">
        <Header title="Criar Conta" />
        <View className="mt-20 gap-6">
          <Input placeholder="Nome" FeatherIconName={null} />
          <Input placeholder="Email" FeatherIconName={null} />
          <Input placeholder="Senha" FeatherIconName={'eye'} />
        </View>
        <Button label="Criar Conta" className="mt-16" />
        <View className="flex-row items-baseline justify-center gap-2 mt-5">
          <Text className="text-primary">Você já possui uma conta ?</Text>
          <Button
            label="Entrar"
            variant={'link'}
            className="px-0"
            onPress={() => navigation.navigate('login')}
          />
        </View>
      </View>
    </ContainerScreens>
  )
}

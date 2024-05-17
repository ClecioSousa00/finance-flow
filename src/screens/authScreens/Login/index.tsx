import { Button } from '@/components/Button/Button'
import { ContainerScreens } from '@/components/ContainerScreens'
import { Header } from '@/components/Header'
import { Input } from '@/components/Input'
import { AuthRouteProps } from '@/routes/auth.route'
import { useNavigation } from '@react-navigation/native'
import { Text, View } from 'react-native'

export const Login = () => {
  const navigation = useNavigation<AuthRouteProps>()
  return (
    <ContainerScreens>
      <Header title="Entrar" />
      <View className="mt-20 gap-6">
        <Input placeholder="Email" />
        <Input placeholder="Senha" FeatherIconName="eye" />
      </View>
      <Button
        label="Entrar"
        className="mt-16"
        onPress={() => console.log('entrou')}
      />
      <Button
        label="Esqueceu sua senha?"
        variant={'link'}
        className="mt-8"
        onPress={() => navigation.navigate('forgotPassword')}
      />
      <View className="flex-row items-baseline justify-center gap-2 mt-5">
        <Text className="text-primary">Não tem uma conta ainda?</Text>
        <Button
          label="Inscrever-se"
          variant={'link'}
          className="px-0"
          onPress={() => navigation.navigate('register')}
        />
      </View>
    </ContainerScreens>
  )
}

import { Button } from '@/components/Button/Button'
import { ContainerScreens } from '@/components/ContainerScreens'
import { Header } from '@/components/Header'
import { Input } from '@/components/Input'
import { AuthRouteProps } from '@/routes/auth.route'
import { useNavigation } from '@react-navigation/native'
import { Text } from 'react-native'

export const ForgotPassword = () => {
  const navigation = useNavigation<AuthRouteProps>()
  return (
    <ContainerScreens>
      <Header title="Recuperar Senha" />
      <Text className="font-poppins-semiBold text-2xl mt-20 mb-11">
        Não se preocupe. Digite seu e-mail e enviaremos um link para redefinir
        sua senha.
      </Text>
      {/* <Input placeholder="Email" /> */}
      <Button
        label="Continuar"
        className="mt-8"
        onPress={() => navigation.navigate('emailSent')}
      />
    </ContainerScreens>
  )
}

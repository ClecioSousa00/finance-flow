import { Button } from '@/components/Button/Button'
import { ContainerScreens } from '@/components/ContainerScreens'
import { Header } from '@/components/Header'
import { Input } from '@/components/Input'
import { InputErrorMessage } from '@/components/InputErrorMessage'
import { AuthRouteProps } from '@/routes/auth.route'
import { useNavigation } from '@react-navigation/native'
import { Text, View } from 'react-native'
import { useLogin } from './useLogin'

export const Login = () => {
  const navigation = useNavigation<AuthRouteProps>()
  const { control, errors, handleSubmit } = useLogin()

  return (
    <ContainerScreens>
      <Header title="Entrar" />
      <View className="mt-20 gap-6">
        <View>
          <Input
            placeholder="Email"
            name="email"
            control={control}
            className={errors.email?.message ? 'border-2 border-danger' : ''}
            keyboardType="email-address"
          />
          {errors.email?.message && (
            <InputErrorMessage
              error={errors.email.message}
              className="ml-2 mt-1"
            />
          )}
        </View>
        <View>
          <Input
            placeholder="Senha"
            FeatherIconName="eye"
            name="password"
            control={control}
            secureTextEntry={true}
            className={errors.password?.message ? 'border-2 border-danger' : ''}
          />
          {errors.password?.message && (
            <InputErrorMessage
              error={errors.password.message}
              className="ml-2 mt-1"
            />
          )}
        </View>
      </View>
      <Button label="Entrar" className="mt-16" onPress={handleSubmit} />
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

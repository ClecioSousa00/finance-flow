import { Button } from '@/components/Button/Button'
import { ContainerScreens } from '@/components/ContainerScreens'
import { Header } from '@/components/Header'
import { AuthRouteProps } from '@/routes/auth.route'
import { useNavigation } from '@react-navigation/native'
import { Text, View } from 'react-native'
import { useLogin } from './useLogin'
import { InputGroup } from '@/components/Input'
import { Feather } from '@expo/vector-icons'

export const Login = () => {
  const navigation = useNavigation<AuthRouteProps>()
  const { control, errors, handleSubmit } = useLogin()

  return (
    <ContainerScreens>
      <Header title="Entrar" />
      <View className="mt-20 gap-6">
        <InputGroup.InputRoot>
          <InputGroup.InputContent
            className={errors.email?.message ? 'border-2 border-danger' : ''}
          >
            <InputGroup.Input
              placeholder="Email"
              name="email"
              control={control}
              keyboardType="email-address"
            />
          </InputGroup.InputContent>

          {errors.email?.message && (
            <InputGroup.InputErrorMessage
              error={errors.email.message}
              className="ml-2 mt-1"
            />
          )}
        </InputGroup.InputRoot>

        <InputGroup.InputRoot>
          <InputGroup.InputContent
            className={errors.password?.message ? 'border-2 border-danger' : ''}
          >
            <InputGroup.Input
              placeholder="Senha"
              name="password"
              control={control}
              secureTextEntry={true}
            />
            <Feather name="eye" size={24} color="#91919F" />
          </InputGroup.InputContent>

          {errors.password?.message && (
            <InputGroup.InputErrorMessage
              error={errors.password.message}
              className="ml-2 mt-1"
            />
          )}
        </InputGroup.InputRoot>
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

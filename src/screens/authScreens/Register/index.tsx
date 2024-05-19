import { Text, View } from 'react-native'

import { ContainerScreens } from '@/components/ContainerScreens'
import { Header } from '@/components/Header'
import { Input } from '@/components/Input'
import { Button } from '@/components/Button/Button'
import { useNavigation } from '@react-navigation/native'
import { AuthRouteProps } from '@/routes/auth.route'

import { InputErrorMessage } from '@/components/InputErrorMessage'
import { useRegister } from './useRegister'

export const Register = () => {
  const navigation = useNavigation<AuthRouteProps>()
  const { control, errors, handleSubmit } = useRegister()

  return (
    <ContainerScreens>
      <View className="flex-1">
        <Header title="Criar Conta" />
        <View className="mt-20 gap-6">
          <View>
            <Input
              placeholder="Nome"
              name="username"
              control={control}
              className={
                errors.username?.message ? 'border-2 border-danger' : ''
              }
            />
            {errors.username?.message && (
              <InputErrorMessage
                error={errors.username.message}
                className="ml-2 mt-1"
              />
            )}
          </View>
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
              FeatherIconName={'eye'}
              name="password"
              control={control}
              secureTextEntry={true}
              className={
                errors.password?.message ? 'border-2 border-danger' : ''
              }
            />
            {errors.password?.message && (
              <InputErrorMessage
                error={errors.password.message}
                className="ml-2 mt-1"
              />
            )}
          </View>
        </View>
        <Button label="Criar Conta" className="mt-16" onPress={handleSubmit} />
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

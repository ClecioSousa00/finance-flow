import { Text, View, TouchableOpacity } from 'react-native'

import { ContainerScreens } from '@/components/ContainerScreens'
import { Header } from '@/components/Header'
import { Button } from '@/components/Button/Button'
import { useNavigation } from '@react-navigation/native'
import { AuthRouteProps } from '@/routes/auth.route'

import { Feather } from '@expo/vector-icons'
import { useRegister } from './useRegister'
import { InputGroup } from '@/components/Input'
import { useState } from 'react'

export const Register = () => {
  const navigation = useNavigation<AuthRouteProps>()
  const { control, errors, handleSubmit, isLoading } = useRegister()
  const [hasPasswordVisible, setHasPasswordVisible] = useState(true)

  return (
    <ContainerScreens>
      <View className="flex-1">
        <Header title="Criar Conta" />
        <View className="mt-20 gap-6">
          <InputGroup.InputRoot>
            <InputGroup.InputContent
              className={errors.email?.message ? 'border-2 border-danger' : ''}
            >
              <InputGroup.Input
                placeholder="Nome"
                name="username"
                control={control}
              />
            </InputGroup.InputContent>

            {errors.username?.message && (
              <InputGroup.InputErrorMessage
                error={errors.username.message}
                className="ml-2 mt-1"
              />
            )}
          </InputGroup.InputRoot>
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
              className={
                errors.password?.message ? 'border-2 border-danger' : ''
              }
            >
              <InputGroup.Input
                placeholder="Senha"
                name="password"
                control={control}
                secureTextEntry={hasPasswordVisible}
              />
              <TouchableOpacity
                onPress={() => setHasPasswordVisible((prevState) => !prevState)}
              >
                <Feather
                  name={`${hasPasswordVisible ? 'eye' : 'eye-off'}`}
                  size={24}
                  color="#91919F"
                />
              </TouchableOpacity>
            </InputGroup.InputContent>

            {errors.password?.message && (
              <InputGroup.InputErrorMessage
                error={errors.password.message}
                className="ml-2 mt-1"
              />
            )}
          </InputGroup.InputRoot>
        </View>
        <Button
          label="Criar Conta"
          className="mt-16"
          isLoading={isLoading}
          disabled={isLoading}
          onPress={handleSubmit}
        />
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

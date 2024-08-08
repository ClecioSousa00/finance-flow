import { useState } from 'react'
import {
  Keyboard,
  Text,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
} from 'react-native'

import { Feather } from '@expo/vector-icons'

import { useNavigation } from '@react-navigation/native'
import { AuthRouteProps } from '@/routes/auth.route'

import { Button } from '@/components/Button/Button'
import { ContainerScreens } from '@/components/ContainerScreens'
import { InputGroup } from '@/components/Input'
import { HeaderAppScreen } from '@/components/HeaderAppScreen'
import { TitleScreen } from '@/components/TitleScreen'
import { Container } from '@/components/Container'

import { useLogin } from './useLogin'

export const Login = () => {
  const navigation = useNavigation<AuthRouteProps>()
  const { control, errors, handleSubmit, isLoading } = useLogin()
  const [hasPasswordVisible, setHasPasswordVisible] = useState(true)

  return (
    <ContainerScreens>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View className="flex-1">
          <HeaderAppScreen>
            <TitleScreen title="entrar" />
          </HeaderAppScreen>
          <Container>
            <View className="gap-6">
              <InputGroup.InputRoot>
                <InputGroup.InputContent
                  className={
                    errors.email?.message ? 'border-2 border-danger' : ''
                  }
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
                    onPress={() =>
                      setHasPasswordVisible((prevState) => !prevState)
                    }
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
              label="Entrar"
              className="mt-16"
              isLoading={isLoading}
              disabled={isLoading}
              onPress={handleSubmit}
            />
            <View className="items-center">
              <Button
                label="Esqueceu sua senha?"
                variant={'link'}
                size={'link'}
                className="mt-8"
                onPress={() => navigation.navigate('forgotPassword')}
              />
            </View>
            <View className="flex-row items-baseline justify-center gap-2 mt-8">
              <Text className="text-secondary-dark">
                Não tem uma conta ainda?
              </Text>
              <Button
                label="Inscrever-se"
                variant={'link'}
                size={'link'}
                onPress={() => navigation.navigate('register')}
              />
            </View>
          </Container>
        </View>
      </TouchableWithoutFeedback>
    </ContainerScreens>
  )
}

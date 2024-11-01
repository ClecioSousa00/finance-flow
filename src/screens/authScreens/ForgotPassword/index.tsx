import { Keyboard, Text, TouchableWithoutFeedback, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { ContainerScreens } from '@/components/ContainerScreens'
import { Button } from '@/components/Button/Button'
import { InputGroup } from '@/components/Input'
import { Container } from '@/components/Container'
import { HeaderAppScreen } from '@/components/HeaderAppScreen'
import { TitleScreen } from '@/components/TitleScreen'

import { useForgotPassword } from './useForgotPassword'
import { AuthRouteProps } from '@/routes/auth.route'

export const ForgotPassword = () => {
  const navigation = useNavigation<AuthRouteProps>()
  const { control, errors, handleSubmit, isLoading } = useForgotPassword()

  return (
    <ContainerScreens>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View className="flex-1">
          <HeaderAppScreen className="h-48">
            <TitleScreen title="recuperar senha" />
          </HeaderAppScreen>
          <Container className="pt-12">
            <Text className="font-poppins-semiBold text-2xl  mb-11 text-center">
              Não se preocupe. Digite seu e-mail e enviaremos um link para
              redefinir sua senha.
            </Text>
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
            <Button
              label="Continuar"
              className="mt-8"
              isLoading={isLoading}
              disabled={isLoading}
              onPress={handleSubmit}
            />
            <Button
              label="Fazer Login"
              variant={'link'}
              size={'link'}
              className="mt-8"
              onPress={() => navigation.navigate('login')}
            />
          </Container>
        </View>
      </TouchableWithoutFeedback>
    </ContainerScreens>
  )
}

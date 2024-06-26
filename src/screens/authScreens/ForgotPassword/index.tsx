import { Keyboard, Text, TouchableWithoutFeedback, View } from 'react-native'

import { ContainerScreens } from '@/components/ContainerScreens'
import { Button } from '@/components/Button/Button'
import { Header } from '@/components/Header'
import { InputGroup } from '@/components/Input'

import { useForgotPassword } from './useForgotPassword'

export const ForgotPassword = () => {
  const { control, errors, handleSubmit, isLoading } = useForgotPassword()

  return (
    <ContainerScreens>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View>
          <Header title="Recuperar Senha" />
          <Text className="font-poppins-semiBold text-2xl mt-20 mb-11">
            Não se preocupe. Digite seu e-mail e enviaremos um link para
            redefinir sua senha.
          </Text>
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
          <Button
            label="Continuar"
            className="mt-8"
            isLoading={isLoading}
            disabled={isLoading}
            onPress={handleSubmit}
          />
        </View>
      </TouchableWithoutFeedback>
    </ContainerScreens>
  )
}

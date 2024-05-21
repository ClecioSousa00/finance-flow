import { Button } from '@/components/Button/Button'
import { ContainerScreens } from '@/components/ContainerScreens'
import { Header } from '@/components/Header'
import { Input } from '@/components/Input'
import { InputErrorMessage } from '@/components/InputErrorMessage'
import { Text } from 'react-native'
import { useForgotPassword } from './useForgotPassword'

export const ForgotPassword = () => {
  const { control, errors, handleSubmit } = useForgotPassword()

  return (
    <ContainerScreens>
      <Header title="Recuperar Senha" />
      <Text className="font-poppins-semiBold text-2xl mt-20 mb-11">
        Não se preocupe. Digite seu e-mail e enviaremos um link para redefinir
        sua senha.
      </Text>
      <Input
        placeholder="Email"
        name="email"
        control={control}
        className={errors.email?.message ? 'border-2 border-danger' : ''}
        keyboardType="email-address"
      />
      {errors.email?.message && (
        <InputErrorMessage error={errors.email.message} className="ml-2 mt-1" />
      )}
      <Button label="Continuar" className="mt-8" onPress={handleSubmit} />
    </ContainerScreens>
  )
}

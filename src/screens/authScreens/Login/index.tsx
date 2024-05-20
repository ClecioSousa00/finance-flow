import { Button } from '@/components/Button/Button'
import { ContainerScreens } from '@/components/ContainerScreens'
import { Header } from '@/components/Header'
import { Input } from '@/components/Input'
import { InputErrorMessage } from '@/components/InputErrorMessage'
import { AuthRouteProps } from '@/routes/auth.route'
import { firebaseErrors } from '@/services/FirebaseErrorsMenssages'
import { UserActions } from '@/services/actions/userActions'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigation } from '@react-navigation/native'
import { useForm } from 'react-hook-form'
import { Alert, Text, View } from 'react-native'
import { z } from 'zod'

export const Login = () => {
  const navigation = useNavigation<AuthRouteProps>()

  const loginUserFormSchema = z.object({
    email: z
      .string({ required_error: 'Informe seu email.' })
      .email('Insira um Email válido.'),
    password: z
      .string({ required_error: 'Informe uma senha.' })
      .min(8, 'Sua senha deve conter no mínimo 8 caracteres'),
  })

  type LoginUserFormData = z.infer<typeof loginUserFormSchema>

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginUserFormData>({
    resolver: zodResolver(loginUserFormSchema),
  })
  const loginUser = async (data: LoginUserFormData) => {
    const { email, password } = data
    const loginUserResponse = await UserActions.loginUserAction({
      email,
      password,
    })
    if (!loginUserResponse.success && loginUserResponse.errorCode) {
      const errorCode = loginUserResponse.errorCode
      Alert.alert(
        'Oops',
        `Não foi possível entrar na sua conta: ${firebaseErrors[errorCode]}`,
      )
    }
    if (!loginUserResponse.success && !loginUserResponse.errorCode) {
      Alert.alert(
        'Oops',
        `Não foi possível entrar na sua conta tente novamente mais tarde.`,
      )
    }
  }

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
      <Button
        label="Entrar"
        className="mt-16"
        onPress={handleSubmit(loginUser)}
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

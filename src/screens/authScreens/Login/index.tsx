import { Button } from '@/components/Button/Button'
import { ContainerScreens } from '@/components/ContainerScreens'
import { Header } from '@/components/Header'
import { Input } from '@/components/Input'
import { AuthRouteProps } from '@/routes/auth.route'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigation } from '@react-navigation/native'
import { useForm } from 'react-hook-form'
import { Text, View } from 'react-native'
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

  return (
    <ContainerScreens>
      <Header title="Entrar" />
      <View className="mt-20 gap-6">
        <Input placeholder="Email" name="email" control={control} />
        <Input
          placeholder="Senha"
          FeatherIconName="eye"
          name="password"
          control={control}
        />
      </View>
      <Button
        label="Entrar"
        className="mt-16"
        onPress={() => console.log('entrou')}
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

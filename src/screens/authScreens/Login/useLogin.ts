import { useForm } from 'react-hook-form'
import { LoginUserFormData, loginUserFormSchema } from './schema'
import { UserActions } from '@/services/actions/userActions'
import { Alert } from 'react-native'
import { firebaseErrors } from '@/services/FirebaseErrorsMenssages'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'

export const useLogin = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginUserFormData>({
    resolver: zodResolver(loginUserFormSchema),
  })
  const [isLoading, setIsLoading] = useState(false)

  const loginUser = async (data: LoginUserFormData) => {
    setIsLoading(true)
    const { email, password } = data
    const loginUserResponse = await UserActions.loginUserAction({
      email,
      password,
    })
    setIsLoading(false)
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
  return {
    control,
    errors,
    handleSubmit: handleSubmit(loginUser),
    isLoading,
  }
}

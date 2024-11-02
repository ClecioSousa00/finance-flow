import { useForm } from 'react-hook-form'
import { CreateUserFormData, createUserFormSchema } from './schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { UserActions } from '@/services/actions/userActions'
import { Alert } from 'react-native'
import { firebaseErrors } from '@/services/FirebaseErrorsMenssages'
import { useState } from 'react'

export const useRegister = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserFormSchema),
  })
  const [isLoading, setIsLoading] = useState(false)

  const createUser = async (data: CreateUserFormData) => {
    setIsLoading(true)
    const registerUserResponse = await UserActions.registerUserAction({
      email: data.email,
      password: data.password,
      username: data.username,
    })
    setIsLoading(false)
    if (!registerUserResponse.success && registerUserResponse.errorCode) {
      const errorCode = registerUserResponse.errorCode
      Alert.alert(
        'Oops',
        `Não foi possível criar a sua conta: ${firebaseErrors[errorCode]} seu erro code ${registerUserResponse.errorCode}. seu error ${registerUserResponse.error}`,
      )
    }
    if (!registerUserResponse.success && !registerUserResponse.errorCode) {
      Alert.alert(
        'Oops',
        `Não foi possível criar a sua conta tente novamente mais tarde.`,
      )
    }
  }
  return {
    errors,
    control,
    handleSubmit: handleSubmit(createUser),
    isLoading,
  }
}

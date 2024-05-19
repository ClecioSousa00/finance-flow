import { useForm } from 'react-hook-form'
import { CreateUserFormData, createUserFormSchema } from './schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { UserActions } from '@/services/actions/userActions'
import { Alert } from 'react-native'
import { FirebaseErrors } from '@/services/FirebaseErrorsMenssages'

export const useRegister = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserFormSchema),
  })
  console.log(errors)

  const createUser = async (data: CreateUserFormData) => {
    console.log(data)

    const registerUserResponse = await UserActions.registerUserAction({
      email: data.email,
      password: data.password,
      username: data.username,
    })
    if (!registerUserResponse.success) {
      const errorCode = registerUserResponse.error?.code
      Alert.alert(
        'Oops',
        `Não foi possível efetuar o login: ${FirebaseErrors[errorCode]}`,
      )
    }
  }
  return {
    errors,
    control,
    handleSubmit: handleSubmit(createUser),
  }
}

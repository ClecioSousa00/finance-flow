import { AuthRouteProps } from '@/routes/auth.route'
import { useNavigation } from '@react-navigation/native'
import { useForm } from 'react-hook-form'
import { SendEmailData, SendEmailSchema } from './schema'
import { UserActions } from '@/services/actions/userActions'
import { zodResolver } from '@hookform/resolvers/zod'
import { firebaseErrors } from '@/services/FirebaseErrorsMenssages'
import { Alert } from 'react-native'

export const useForgotPassword = () => {
  const navigation = useNavigation<AuthRouteProps>()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SendEmailData>({ resolver: zodResolver(SendEmailSchema) })

  const handleSendEmail = async (data: SendEmailData) => {
    const { email } = data
    const sendEmailResponse = await UserActions.forgotPasswordUserAction({
      email,
    })

    if (sendEmailResponse.success) {
      navigation.navigate('emailSent', { email })
      return
    }
    if (!sendEmailResponse.success && sendEmailResponse.errorCode) {
      const errorCode = sendEmailResponse.errorCode
      Alert.alert(
        'Oops',
        `Não foi possível enviar seu email: ${firebaseErrors[errorCode]}`,
      )
    }
    if (!sendEmailResponse.success && !sendEmailResponse.errorCode) {
      Alert.alert(
        'Oops',
        `Não foi possível enviar seu email. Tente novamente mais tarde.`,
      )
    }
  }

  return {
    control,
    errors,
    handleSubmit: handleSubmit(handleSendEmail),
  }
}

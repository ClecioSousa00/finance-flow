import { EmailSent } from '@/screens/authScreens/EmailSent'
import { ForgotPassword } from '@/screens/authScreens/ForgotPassword'
import { Login } from '@/screens/authScreens/Login'
import { Onboarding } from '@/screens/authScreens/Onboarding'
import { Register } from '@/screens/authScreens/Register'
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack'

type StackNavigationProps = {
  onboarding: undefined
  login: undefined
  register: undefined
  forgotPassword: undefined
  emailSent: undefined
}

export type AuthRouteProps = NativeStackNavigationProp<StackNavigationProps>

const { Screen, Navigator } = createNativeStackNavigator<StackNavigationProps>()

export const AuthRoute = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="onboarding" component={Onboarding} />
      <Screen name="login" component={Login} />
      <Screen name="register" component={Register} />
      <Screen name="forgotPassword" component={ForgotPassword} />
      <Screen name="emailSent" component={EmailSent} />
    </Navigator>
  )
}

import { Login } from '@/screens/Login'
import { Onboarding } from '@/screens/Onboarding'
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack'

type StackNavigationProps = {
  onboarding: undefined
  login: undefined
}

export type AuthRouteProps = NativeStackNavigationProp<StackNavigationProps>

const { Screen, Navigator } = createNativeStackNavigator<StackNavigationProps>()

export const AuthRoute = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="onboarding" component={Onboarding} />
      <Screen name="login" component={Login} />
    </Navigator>
  )
}

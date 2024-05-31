import { Home } from '@/screens/appScreens/Home'
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack'

type StackNavigationProps = {
  home: undefined
}

export type StackRouteProps = NativeStackNavigationProp<StackNavigationProps>

const { Screen, Navigator } = createNativeStackNavigator<StackNavigationProps>()

export const StackRoute = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="home" component={Home} />
    </Navigator>
  )
}

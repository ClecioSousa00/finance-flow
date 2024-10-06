import { EditProfile } from '@/screens/appScreens/EditProfile'

import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack'
import { TabsRoute } from './tabs.route'

type StackNavigationAppProps = {
  editProfile: undefined
  initial: undefined
}

export type StackRouteProps = NativeStackNavigationProp<StackNavigationAppProps>

const { Screen, Navigator } =
  createNativeStackNavigator<StackNavigationAppProps>()

export const StackRoute = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="initial" component={TabsRoute} />
      <Screen name="editProfile" component={EditProfile} />
    </Navigator>
  )
}

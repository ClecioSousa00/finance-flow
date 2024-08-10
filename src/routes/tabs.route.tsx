import { CustomTabBar } from '@/components/CustomTabBar'
import { Home } from '@/screens/appScreens/Home'
import { Register } from '@/screens/appScreens/Register'
import { Resume } from '@/screens/appScreens/Resume'
import { Balance } from '@/screens/appScreens/Balance'
import { UserProfile } from '@/screens/appScreens/UserProfile'
import { colors } from '@/styles/colors'
import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
} from '@react-navigation/bottom-tabs'

type TabsNavigationProps = {
  home: undefined
  balance: undefined
  register: undefined
  resume: undefined
  userProfile: undefined
}

export type TabsRouteProps = BottomTabNavigationProp<TabsNavigationProps>
const { Navigator, Screen } = createBottomTabNavigator<TabsNavigationProps>()

export const TabsRoute = () => {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.primary,
        tabBarStyle: {
          borderTopWidth: 0,
        },
      }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Screen name="home" component={Home} />
      <Screen name="balance" component={Balance} />
      <Screen name="register" component={Register} />
      <Screen name="resume" component={Resume} />
      <Screen name="userProfile" component={UserProfile} />
    </Navigator>
  )
}

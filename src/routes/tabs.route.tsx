import { CustomTabBar } from '@/components/CustomTabBar'
import { Home } from '@/screens/appScreens/Home'
import { Resume } from '@/screens/appScreens/Resume'
import { Transactions } from '@/screens/appScreens/Transactions'
import { UserProfile } from '@/screens/appScreens/UserProfile'
import { colors } from '@/styles/colors'
import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
} from '@react-navigation/bottom-tabs'

type TabsNavigationProps = {
  home: undefined
  transactions: undefined
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
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.white,
        tabBarStyle: {
          borderTopWidth: 0,
        },
      }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Screen name="home" component={Home} />
      <Screen name="transactions" component={Transactions} />
      <Screen name="resume" component={Resume} />
      <Screen name="userProfile" component={UserProfile} />
    </Navigator>
  )
}

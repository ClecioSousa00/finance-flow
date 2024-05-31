import {
  createDrawerNavigator,
  DrawerNavigationProp,
} from '@react-navigation/drawer'
import { TabsRoute } from './tabs.route'
import { AntDesign } from '@expo/vector-icons'
import { CustomDrawerContent } from '@/components/CustomDrawerContent'

type DrawerNavigationProps = {
  initial: undefined
}
export type DrawerRouteProps = DrawerNavigationProp<DrawerNavigationProps>

const { Navigator, Screen } = createDrawerNavigator<DrawerNavigationProps>()
export const DrawerRoute = () => {
  return (
    <Navigator
      screenOptions={{ title: '' }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Screen
        name="initial"
        component={TabsRoute}
        options={{
          drawerIcon: ({ color, size }) => (
            <AntDesign name="home" size={size} color={color} />
          ),
          drawerLabel: 'Início',
        }}
      />
    </Navigator>
  )
}

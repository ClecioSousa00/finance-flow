import { NavigationContainer } from '@react-navigation/native'

import { useUser } from '@/contexts/userContext'

import { AuthRoute } from './auth.route'
import { TabsRoute } from './tabs.route'

export const Routes = () => {
  const { user } = useUser()

  return (
    <NavigationContainer>
      {user ? <TabsRoute /> : <AuthRoute />}
    </NavigationContainer>
  )
}

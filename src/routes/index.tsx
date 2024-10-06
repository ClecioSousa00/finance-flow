import { NavigationContainer } from '@react-navigation/native'

import { useUser } from '@/contexts/userContext'

import { AuthRoute } from './auth.route'
import { StackRoute } from './stack.route'

export const Routes = () => {
  const { user } = useUser()

  return (
    <NavigationContainer>
      {user ? <StackRoute /> : <AuthRoute />}
    </NavigationContainer>
  )
}

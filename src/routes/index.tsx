import { NavigationContainer } from '@react-navigation/native'
import { AuthRoute } from './auth.route'

export const Routes = () => {
  return (
    <NavigationContainer>
      <AuthRoute />
    </NavigationContainer>
  )
}

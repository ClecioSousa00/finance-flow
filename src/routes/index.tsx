import { NavigationContainer } from '@react-navigation/native'
import { AuthRoute } from './auth.route'
import { useEffect, useState } from 'react'
import { User } from 'firebase/auth'
import { auth } from '@/services/firebaseConfig'
import { AppRoute } from './app.route'

export const Routes = () => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged((userInfo) => {
      setUser(userInfo)
    })
    return subscriber
  }, [])

  return (
    <NavigationContainer>
      {!user ? <AppRoute /> : <AuthRoute />}
    </NavigationContainer>
  )
}

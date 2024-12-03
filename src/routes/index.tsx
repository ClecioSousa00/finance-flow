import { NavigationContainer } from '@react-navigation/native'

import { useUser } from '@/contexts/userContext'

import { AuthRoute } from './auth.route'
import { StackRoute } from './stack.route'
import { Splash } from '@/screens/Splash'
import { useEffect, useState } from 'react'

export const Routes = () => {
  const { user, loading } = useUser()

  const [isSplashVisible, setIsSplashVisible] = useState(true)

  useEffect(() => {
    const splashTimeout = setTimeout(() => {
      setIsSplashVisible(false)
    }, 1500)

    return () => clearTimeout(splashTimeout)
  }, [])

  if (loading || isSplashVisible) {
    return <Splash />
  }

  return (
    <NavigationContainer>
      {user ? <StackRoute /> : <AuthRoute />}
    </NavigationContainer>
  )
}

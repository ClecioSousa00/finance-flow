import { GestureHandlerRootView } from 'react-native-gesture-handler'

import '@/styles/global.css'

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
} from '@expo-google-fonts/poppins'

import { useEffect } from 'react'
import { Appearance, SafeAreaView } from 'react-native'

import { StatusBar } from 'expo-status-bar'

import { Routes } from '@/routes'

import { UserProvider, useUser } from '@/contexts/userContext'

import Toast from 'react-native-toast-message'
import { TransactionProvider } from '@/contexts/TransactionContext'
import { colors } from '@/styles/colors'
import { Splash } from '@/screens/Splash'

export default function App() {
  const { loading } = useUser()

  const [fontsLoaded, fontError] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
  })

  useEffect(() => Appearance.setColorScheme('light'), [])

  if ((!fontsLoaded && !fontError) || loading) {
    return <Splash />
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.secondary }}>
      <StatusBar style="light" translucent />
      <GestureHandlerRootView
        style={{ flex: 1, backgroundColor: colors.secondary }}
      >
        <TransactionProvider>
          <UserProvider>
            <Routes />
            <Toast />
          </UserProvider>
        </TransactionProvider>
      </GestureHandlerRootView>
    </SafeAreaView>
  )
}

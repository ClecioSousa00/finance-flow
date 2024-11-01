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

import { UserProvider } from '@/contexts/userContext'

import Toast from 'react-native-toast-message'
import { TransactionProvider } from '@/contexts/TransactionContext'

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
  })

  useEffect(() => Appearance.setColorScheme('light'), [])

  if (!fontsLoaded && !fontError) {
    return null
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style="light" translucent />
      <GestureHandlerRootView style={{ flex: 1 }}>
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

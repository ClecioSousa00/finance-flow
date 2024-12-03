// import { GestureHandlerRootView } from 'react-native-gesture-handler'

// import '@/styles/global.css'

// import {
//   useFonts,
//   Poppins_400Regular,
//   Poppins_500Medium,
//   Poppins_600SemiBold,
// } from '@expo-google-fonts/poppins'

// import { useEffect } from 'react'
// import { Appearance, SafeAreaView } from 'react-native'

// import { StatusBar } from 'expo-status-bar'

// import { Routes } from '@/routes'

// import { UserProvider } from '@/contexts/userContext'
// import { TransactionProvider } from '@/contexts/TransactionContext'

// import Toast from 'react-native-toast-message'
// import { colors } from '@/styles/colors'

// export default function App() {
//   const [fontsLoaded, fontError] = useFonts({
//     Poppins_400Regular,
//     Poppins_500Medium,
//     Poppins_600SemiBold,
//   })

//   useEffect(() => Appearance.setColorScheme('light'), [])

//   if (!fontsLoaded && !fontError) {
//     return null
//   }
//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: colors.secondary }}>
//       <StatusBar style="light" translucent />
//       <GestureHandlerRootView
//         style={{ flex: 1, backgroundColor: colors.secondary }}
//       >
//         <TransactionProvider>
//           <UserProvider>
//             <Routes />
//             <Toast />
//           </UserProvider>
//         </TransactionProvider>
//       </GestureHandlerRootView>
//     </SafeAreaView>
//   )
// }
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import '@/styles/global.css'

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
} from '@expo-google-fonts/poppins'

import { useEffect, useState, useCallback } from 'react'
import { SafeAreaView } from 'react-native'

import { StatusBar } from 'expo-status-bar'

import { Routes } from '@/routes'

import { UserProvider } from '@/contexts/userContext'
import { TransactionProvider } from '@/contexts/TransactionContext'

import Toast from 'react-native-toast-message'
import { colors } from '@/styles/colors'

import * as SplashScreen from 'expo-splash-screen'
import * as Font from 'expo-font'

SplashScreen.preventAutoHideAsync()

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false)

  const [fontsLoaded, fontError] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
  })

  const onLayoutRootView = useCallback(() => {
    if (appIsReady) {
      SplashScreen.hide()
    }
  }, [appIsReady])

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          Poppins_400Regular,
          Poppins_500Medium,
          Poppins_600SemiBold,
        })
      } catch (e) {
        console.warn(e)
      } finally {
        setAppIsReady(true)
      }
    }

    prepare()
  }, [])

  if (!appIsReady || !fontsLoaded || fontError) {
    return null
  }

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colors.secondary }}
      onLayout={onLayoutRootView}
    >
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

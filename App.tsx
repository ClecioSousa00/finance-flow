import 'react-native-gesture-handler'
import '@/styles/global.css'
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
} from '@expo-google-fonts/poppins'
import { StatusBar } from 'expo-status-bar'
import { View } from 'react-native'
import { Routes } from '@/routes'
import { UserProvider } from '@/contexts/userContext'

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
  })

  if (!fontsLoaded && !fontError) {
    return null
  }
  return (
    <View className="flex-1 bg-primary">
      <StatusBar style="light" translucent />
      <UserProvider>
        <Routes />
      </UserProvider>
    </View>
  )
}

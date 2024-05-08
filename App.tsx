import '@/styles/global.css'
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
} from '@expo-google-fonts/poppins'
import { Onboarding } from '@/screens/Onboarding'
import { StatusBar } from 'expo-status-bar'
import { View } from 'react-native'

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
      <StatusBar style="light" />
      <Onboarding />
    </View>
  )
}

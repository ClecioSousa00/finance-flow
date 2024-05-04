import '@/styles/global.css'
import { StatusBar } from 'expo-status-bar'
import { Text, View } from 'react-native'

export default function App() {
  return (
    <View className="bg-danger flex-1 items-center justify-center">
      <StatusBar style="auto" />
      <Text>Open up App.tsx to start working on your app!</Text>
    </View>
  )
}

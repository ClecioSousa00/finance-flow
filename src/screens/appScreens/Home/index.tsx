import { Alert, Text, View } from 'react-native'
import { signOut } from 'firebase/auth'
import { auth } from '@/services/firebaseConfig'
import { Button } from '@/components/Button/Button'

export const Home = () => {
  const handleSignOut = async () => {
    try {
      await signOut(auth)
    } catch (error) {
      console.log(error)
      Alert.alert('Erro ao sair da conta. Tente novamente mais tarde.')
    }
  }
  return (
    <View className="flex-1 items-center justify-center">
      <Text>Home</Text>
      <Button label="Sair" onPress={handleSignOut} />
    </View>
  )
}

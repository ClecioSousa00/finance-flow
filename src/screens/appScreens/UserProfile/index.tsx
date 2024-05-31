import { Button } from '@/components/Button/Button'
import { auth } from '@/services/firebaseConfig'
import { signOut } from 'firebase/auth'
import { View, Text, Alert } from 'react-native'

export const UserProfile = () => {
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
      <Text>UserProfile</Text>
      <Button label="Sair" onPress={handleSignOut} />
    </View>
  )
}

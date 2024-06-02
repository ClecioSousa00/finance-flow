import { HeaderAppScreen } from '@/components/HeaderAppScreen'
import { ProfileAvatar } from '@/components/ProfileAvatar'
import { useUser } from '@/contexts/userContext'
import { View } from 'react-native'

export const Home = () => {
  const { userInfoDb } = useUser()
  console.log(userInfoDb)

  return (
    <View className="flex-1">
      <HeaderAppScreen className="flex-row items-center">
        <ProfileAvatar username={userInfoDb.username} />
      </HeaderAppScreen>
    </View>
  )
}

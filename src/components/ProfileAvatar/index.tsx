import { Text, View } from 'react-native'
import { Avatar, AvatarFallback, AvatarImage } from '../Avatar/Avatar'

export const ProfileAvatar = () => {
  return (
    <View className="flex-row items-center gap-2">
      <Avatar>
        <AvatarImage
          source={{
            uri: 'https://atars.githubusercontent.com/u/123471873?v=4',
          }}
        />
        <AvatarFallback className="bg-primary/30">CS</AvatarFallback>
      </Avatar>
      <View>
        <Text>Olá,</Text>
        <Text className="text-lg">Username</Text>
      </View>
    </View>
  )
}

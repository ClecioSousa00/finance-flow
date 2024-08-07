import { Text, View } from 'react-native'
import { Avatar, AvatarFallback, AvatarImage } from '../Avatar/Avatar'

type Props = {
  username: string
}

export const ProfileAvatar = ({ username }: Props) => {
  return (
    <View className="flex-row items-center gap-2">
      <Avatar>
        <AvatarImage
          source={{
            uri: 'https://atars.githubusercontent.com/u/123471873?v=4',
          }}
        />
        <AvatarFallback className="bg-primary/30 uppercase text-white">
          {username?.substring(0, 2)}
        </AvatarFallback>
      </Avatar>
      <View>
        <Text className="text-white">Olá,</Text>
        <Text className="text-lg text-white">{username}</Text>
      </View>
    </View>
  )
}

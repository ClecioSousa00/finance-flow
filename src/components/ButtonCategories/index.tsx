import { Text, TouchableOpacity, View } from 'react-native'
import { SvgProps } from 'react-native-svg'

type Props = {
  icon: React.FC<SvgProps>
  name: string
  handleSelectCategory: (categoryName: string) => void
}

export const ButtonCategories = ({
  icon: Icon,
  name,
  handleSelectCategory,
}: Props) => {
  return (
    <View className="items-center">
      <TouchableOpacity
        activeOpacity={0.7}
        className="bg-blue-dark w-24 h-24 rounded-[18px] justify-center items-center"
        onPress={() => handleSelectCategory(name)}
      >
        <Icon />
      </TouchableOpacity>
      <Text className="text-secondary-dark text-sm capitalize">{name}</Text>
    </View>
  )
}

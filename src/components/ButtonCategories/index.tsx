import { CategoryType } from '@/utils/categorieincons'
import { Text, TouchableOpacity, View } from 'react-native'
import { SvgProps } from 'react-native-svg'

type Props = {
  icon: React.FC<SvgProps>
  name: CategoryType
  handleSelectCategory: (categoryName: string) => void
}

export const ButtonCategories = ({
  icon: Icon,
  name,
  handleSelectCategory,
}: Props) => {
  return (
    <View className="items-center  w-[78px]">
      <TouchableOpacity
        activeOpacity={0.7}
        className="bg-blue-dark w-16 h-16 rounded-[18px] justify-center items-center"
        onPress={() => handleSelectCategory(name)}
      >
        <Icon width={32} height={32} />
      </TouchableOpacity>
      <Text className="text-secondary-dark text-sm capitalize">{name}</Text>
    </View>
  )
}

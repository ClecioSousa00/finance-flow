import { TextInput, TextInputProps, View } from 'react-native'
import { Feather } from '@expo/vector-icons'

type InputProps = {
  FeatherIconName?: keyof typeof Feather.glyphMap
} & TextInputProps

export const Input = ({ FeatherIconName, ...rest }: InputProps) => {
  return (
    <View className="bg-white h-14 flex-row items-center rounded-2xl  px-4">
      <TextInput className="flex-1 pr-4" {...rest} />
      {FeatherIconName && (
        <Feather name={FeatherIconName} size={24} color="#91919F" />
      )}
    </View>
  )
}

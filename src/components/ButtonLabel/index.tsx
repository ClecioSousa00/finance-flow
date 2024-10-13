import { colors } from '@/styles/colors'
import { Pressable, PressableProps, Text } from 'react-native'

type Props = {
  label: string
  selected?: boolean
} & PressableProps

export const ButtonLabel = ({ label, selected = true, ...rest }: Props) => {
  return (
    <Pressable
      className="rounded-2xl px-4 py-2 flex-row justify-center items-center  gap-1"
      style={{
        opacity: selected ? 1 : 0.7,
        backgroundColor: selected ? colors.secondary : colors.disabled,
      }}
      {...rest}
    >
      <Text className="text-white capitalize font-poppins-medium">{label}</Text>
    </Pressable>
  )
}

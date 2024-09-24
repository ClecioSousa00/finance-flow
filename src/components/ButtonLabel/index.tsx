import { Pressable, PressableProps, Text } from 'react-native'

type Props = {
  label: string
  children?: React.ReactNode
  selected?: boolean
} & PressableProps

export const ButtonLabel = ({
  label,
  selected = true,
  children,
  ...rest
}: Props) => {
  return (
    <Pressable
      className="rounded-2xl px-4 py-2 flex-row justify-center items-center bg-secondary gap-1"
      style={{
        opacity: selected ? 1 : 0.7,
      }}
      {...rest}
    >
      <Text className="text-white capitalize font-poppins-medium">{label}</Text>
      {children}
    </Pressable>
  )
}

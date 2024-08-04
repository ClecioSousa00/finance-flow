import { Text } from 'react-native'

type Props = {
  label: string
}

export const InputLabel = ({ label }: Props) => {
  return (
    <Text className="capitalize text-disabled font-poppins-medium ml-1">
      {label}
    </Text>
  )
}

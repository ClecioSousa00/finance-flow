import { Text } from 'react-native'

type Props = {
  message: string
}

export const Modalsubtitle = ({ message }: Props) => {
  return (
    <Text className="text-secondary-dark mt-3 text-base capitalize text-center">
      {message}
    </Text>
  )
}

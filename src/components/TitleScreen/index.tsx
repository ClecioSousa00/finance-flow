import { Text } from 'react-native'

type Props = {
  title: string
}

export const TitleScreen = ({ title }: Props) => {
  return (
    <Text className=" text-2xl font-poppins-medium text-secondary-dark/45 pt-6 text-center capitalize">
      {title}
    </Text>
  )
}

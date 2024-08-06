import { Text } from 'react-native'

type Props = {
  title: string
}

export const ModalTitle = ({ title }: Props) => {
  return (
    <Text className="text-secondary-dark font-poppins-semiBold text-xl capitalize">
      {title}
    </Text>
  )
}

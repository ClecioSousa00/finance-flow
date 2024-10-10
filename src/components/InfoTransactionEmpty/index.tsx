import { cn } from '@/lib/utils'
import { Text, View, ViewProps } from 'react-native'

type Props = {
  message: string
} & ViewProps

export const InfoTransactionEmpty = ({
  message,
  className,
  ...rest
}: Props) => {
  return (
    <View
      className={cn('items-center justify-center  h-64', className)}
      {...rest}
    >
      <Text className="text-disabled text-lg font-poppins-semiBold text-center capitalize w-5/6">
        {message}
      </Text>
    </View>
  )
}

import { cn } from '@/lib/utils'
import { Text, TextProps } from 'react-native'

type InputErrorMessageProps = {
  error: string
} & TextProps

export const InputErrorMessage = ({
  error,
  className,
}: InputErrorMessageProps) => {
  return <Text className={cn('text-danger', className)}>{error}</Text>
}

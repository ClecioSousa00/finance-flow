import { cn } from '@/lib/utils'
import { Text, TextProps } from 'react-native'

type Props = {
  title: string
} & TextProps

export const TitleScreen = ({ title, className, ...rest }: Props) => {
  return (
    <Text
      className={cn(
        ' text-2xl font-poppins-semiBold text-primary text-center capitalize',
        className,
      )}
      {...rest}
    >
      {title}
    </Text>
  )
}

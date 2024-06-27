import { cn } from '@/lib/utils'
import { ReactNode } from 'react'
import { View, ViewProps } from 'react-native'

type InputRootProps = {
  children: ReactNode
} & ViewProps

export const InputContent = ({
  children,
  className,
  ...rest
}: InputRootProps) => {
  return (
    <View
      className={cn(
        'bg-color-input h-14  flex-row items-center rounded-2xl  px-4',
        className,
      )}
      {...rest}
    >
      {children}
    </View>
  )
}

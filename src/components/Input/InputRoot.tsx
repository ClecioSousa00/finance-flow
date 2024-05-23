import { cn } from '@/lib/utils'
import { ReactNode } from 'react'
import { View, ViewProps } from 'react-native'

type InputRootProps = {
  children: ReactNode
} & ViewProps

export const InputRoot = ({ children, className, ...rest }: InputRootProps) => {
  return (
    <View className={cn(className)} {...rest}>
      {children}
    </View>
  )
}

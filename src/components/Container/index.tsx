import { cn } from '@/lib/utils'
import React from 'react'
import { View, ViewProps } from 'react-native'

type Props = {
  children: React.ReactNode
} & ViewProps

export const Container = ({ children, className }: Props) => {
  return (
    <View
      className={cn('px-9 bg-primary flex-1 rounded-t-[60px] pt-9', className)}
    >
      {children}
    </View>
  )
}

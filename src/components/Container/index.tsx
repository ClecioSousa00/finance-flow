import React from 'react'
import { View } from 'react-native'

type Props = {
  children: React.ReactNode
}

export const Container = ({ children }: Props) => {
  return (
    <View className="px-9 bg-primary flex-1 rounded-t-[60px] pt-9">
      {children}
    </View>
  )
}

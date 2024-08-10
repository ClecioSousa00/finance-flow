import { View, ViewProps } from 'react-native'

import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type Props = {
  children: ReactNode
} & ViewProps

export const HeaderAppScreen = ({ children, className, ...rest }: Props) => {
  return (
    <View
      className={cn(' px-14 h-60 items-center justify-center', className)}
      {...rest}
    >
      {/* <TouchableOpacity activeOpacity={0.7}>
        <Ionicons name="exit-outline" size={24} color={colors.white} />
      </TouchableOpacity> */}
      {children}
    </View>
  )
}

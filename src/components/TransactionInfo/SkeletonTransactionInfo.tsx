import { View, ViewProps } from 'react-native'
import { Skeleton } from '../Skeleton'
import { cn } from '@/lib/utils'

type Props = ViewProps

export const SkeletonTransactionInfo = ({ className, ...rest }: Props) => {
  return (
    <View className={cn('flex-row gap-2  w-full', className)} {...rest}>
      <Skeleton className="w-14 h-14 rounded-2xl bg-gray-300" />
      <Skeleton className=" h-14 w-80 rounded-2xl bg-gray-300" />
    </View>
  )
}

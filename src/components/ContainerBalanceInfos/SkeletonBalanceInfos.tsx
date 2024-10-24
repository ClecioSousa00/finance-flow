import { View, ViewProps } from 'react-native'
import { Skeleton } from '../Skeleton'
import { cn } from '@/lib/utils'

type Props = ViewProps

export const SkeletonBalanceInfos = ({ className, ...rest }: Props) => {
  return (
    <View className={cn('w-full gap-3', className)} {...rest}>
      <Skeleton className="h-20 w-full rounded-xl bg-primary-Light" />
      <View className="flex-row justify-between w-full ">
        <Skeleton className="h-12 w-28 rounded-xl bg-primary-Light" />
        <Skeleton className="h-12 w-28 rounded-xl bg-primary-Light" />
      </View>
      <Skeleton className="h-8 w-full rounded-xl bg-primary-Light" />
    </View>
  )
}

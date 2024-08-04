import { Text, View } from 'react-native'

import Income from '@/assets/Income.svg'
import Bills from '@/assets/Bilss.svg'
import Food from '@/assets/Food.svg'
import Shopping from '@/assets/Shopping.svg'
import Marketplace from '@/assets/Marketplace.svg'

import { Transaction } from '@/services/dataBaseTypes'
import { formatPrice } from '@/utils/priceFormat'
import { cn } from '@/lib/utils'
import { categories, CategoryType } from './categorieincons'

type TransactionsProps = {
  transaction: Transaction
}

export const TransactionInfo = ({ transaction }: TransactionsProps) => {
  const CategoryIcon = categories[transaction.categoria as CategoryType]

  return (
    <View className="flex-row items-center justify-between">
      <View className="flex-row items-center gap-2">
        <View className="bg-blue-dark w-14 h-14 rounded-[18px] justify-center items-center">
          {CategoryIcon && <CategoryIcon width={32} />}
        </View>
        <View>
          <Text className="text-secondary-dark capitalize font-poppins-medium">
            {transaction.name}
          </Text>
          <Text className="text-blue-dark text-sm">
            18:27 - {`${transaction.fullDate}`}
          </Text>
        </View>
      </View>

      <Text className="text-secondary-dark capitalize font-poppins-medium">
        {formatPrice(transaction.price)}
      </Text>
    </View>

    // <View className="flex-row justify-between items-center ">
    //   <View className="flex-row gap-2 items-center">
    //     {CategoryIcon && <CategoryIcon width={40} />}
    //     <View>
    //       <Text className="capitalize text-white">{transaction.categoria}</Text>
    //       <Text className="text-xs text-gray-400 ">{transaction.fullDate}</Text>
    //     </View>
    //   </View>
    //   <View className="h-2/3 w-[1px] bg-secondary"></View>
    //   <Text>{transaction.name}</Text>
    //   <View className="h-2/3 w-[1px] bg-secondary"></View>
    //   <View className="flex-row gap-1 items-center">
    //     <Text
    //       className={cn(
    //         transaction.categoria === 'renda' ? 'text-success' : 'text-danger',
    //       )}
    //     >{`${transaction.categoria === 'renda' ? '' : '- '}${formatPrice(transaction.price)}`}</Text>
    //     {/* <Entypo name="chevron-small-right" size={24} color={colors.white} /> */}
    //   </View>
    // </View>
  )
}

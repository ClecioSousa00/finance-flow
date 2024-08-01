import { Text, View } from 'react-native'

import Income from '@/assets/Income.svg'
import Bills from '@/assets/Bilss.svg'
import Food from '@/assets/Food.svg'
import Shopping from '@/assets/Shopping.svg'

import { Transaction } from '@/services/dataBaseTypes'
import { formatPrice } from '@/utils/priceFormat'
import { cn } from '@/lib/utils'

type CategoryType = 'shopping' | 'comida' | 'contas' | 'renda'

type TransactionsProps = {
  transaction: Transaction
}
const categories = {
  shopping: Shopping,
  comida: Food,
  contas: Bills,
  renda: Income,
}

export const TransactionInfo = ({ transaction }: TransactionsProps) => {
  const CategoryIcon = categories[transaction.categoria as CategoryType]

  return (
    <View className="flex-row justify-between items-center ">
      <View className="flex-row gap-2 items-center">
        {CategoryIcon && <CategoryIcon width={40} />}
        <View>
          <Text className="capitalize text-white">{transaction.name}</Text>
          <Text className="text-xs text-gray-400 ">{transaction.fullDate}</Text>
        </View>
      </View>
      <View className="flex-row gap-1 items-center">
        <Text
          className={cn(
            transaction.categoria === 'renda' ? 'text-success' : 'text-danger',
          )}
        >{`${transaction.categoria === 'renda' ? '' : '- '}${formatPrice(transaction.price)}`}</Text>
        {/* <Entypo name="chevron-small-right" size={24} color={colors.white} /> */}
      </View>
    </View>
  )
}

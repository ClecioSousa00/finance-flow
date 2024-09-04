import { Pressable, Text, View } from 'react-native'

import { formatPrice } from '@/utils/priceFormat'
import { categories, CategoryType } from '@/utils/categorieincons'
import { getDayFromDate, monthlyFormatted } from '@/utils/DateFormat'
import { Transaction } from '@/types/transactionProps'
import { UserActions } from '@/services/actions/userActions'
import { User } from 'firebase/auth'

type TransactionsProps = {
  transaction: Transaction
  user: User | null
}

export const TransactionInfo = ({ transaction, user }: TransactionsProps) => {
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
            {`${getDayFromDate(transaction.fullDate)} de ${monthlyFormatted(transaction.month)}`}
          </Text>
        </View>
      </View>

      <Text className="text-secondary-dark capitalize font-poppins-medium">
        {formatPrice(transaction.price)}
      </Text>
      <Pressable
        onPress={() => UserActions.deleteTransactionAction(transaction, user)}
      >
        <Text>excluir</Text>
      </Pressable>
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

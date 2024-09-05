import { Pressable, Text, View } from 'react-native'

import Feather from '@expo/vector-icons/Feather'
import FontAwesome from '@expo/vector-icons/FontAwesome'

import { formatPrice } from '@/utils/priceFormat'
import { categories, CategoryType } from '@/utils/categorieincons'
import { getDayFromDate, monthlyFormatted } from '@/utils/DateFormat'

import { Transaction } from '@/types/transactionProps'

import { colors } from '@/styles/colors'

import { cn } from '@/lib/utils'

type TransactionsProps = {
  transaction: Transaction
  handleOpenModal: (transaction: Transaction) => void
}

export const TransactionInfo = ({
  transaction,
  handleOpenModal,
}: TransactionsProps) => {
  const CategoryIcon = categories[transaction.categoria as CategoryType]

  return (
    <View className="flex-row items-center justify-between ">
      <View className="flex-row items-center gap-2">
        <View className="bg-blue-dark w-14 h-14 rounded-[18px] justify-center items-center">
          {CategoryIcon && <CategoryIcon width={32} />}
        </View>
        <View>
          <Text className="text-disabled capitalize font-poppins-medium">
            {transaction.name}
          </Text>
          <Text className="text-blue-dark text-sm">
            {`${getDayFromDate(transaction.fullDate)} de ${monthlyFormatted(transaction.month)}`}
          </Text>
        </View>
      </View>

      <Text
        className={cn(
          'capitalize font-poppins-medium',
          transaction.optionTransaction === 'despesa'
            ? 'text-blue-dark'
            : 'text-success',
        )}
      >
        {`${transaction.optionTransaction === 'despesa' ? '-' : ''}${formatPrice(transaction.price)}`}
      </Text>
      <View>
        <View className=" items-center justify-between gap-4">
          <Pressable>
            <Feather name="edit" size={16} color={colors.disabled} />
          </Pressable>
          <Pressable onPress={() => handleOpenModal(transaction)}>
            <FontAwesome name="trash-o" size={20} color={colors.disabled} />
          </Pressable>
        </View>
      </View>
    </View>
  )
}

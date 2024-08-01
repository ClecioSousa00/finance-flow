import { Text, TouchableOpacity, View } from 'react-native'
import { Entypo } from '@expo/vector-icons'
import { colors } from '@/styles/colors'

import Income from '@/assets/Income.svg'
import Bills from '@/assets/Bilss.svg'
import Food from '@/assets/Food.svg'
import Shopping from '@/assets/Shopping.svg'

import { Transaction } from '@/services/dataBaseTypes'
import { FormatValueToLocaleString } from '@/utils/priceFormat'

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
    <TouchableOpacity className="flex-row justify-between items-center ">
      <View className="flex-row gap-2 items-center">
        {CategoryIcon && <CategoryIcon width={40} />}
        <Text className="capitalize ">{transaction.categoria}</Text>
      </View>
      <View className="flex-row gap-1 items-center">
        <Text className="text-success">{`R$ ${FormatValueToLocaleString(parseFloat(transaction.price.replace(/\D/g, '')))}`}</Text>
        <Entypo name="chevron-small-right" size={24} color={colors.white} />
      </View>
    </TouchableOpacity>
  )
}

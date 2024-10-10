import { TransactionsPieChart } from '@/types/transactionProps'
import { FormatValueToLocaleString } from '@/utils/priceFormat'
import { Text, View } from 'react-native'

type Props = {
  categoryChart: TransactionsPieChart
  keyName: string | undefined
}

export const CategoryChart = ({ categoryChart, keyName }: Props) => {
  return (
    <View className="flex-row w-2/5 gap-2 items-center">
      <View
        className="h-4 w-4"
        style={{ backgroundColor: categoryChart.color }}
      />
      <View className="flex-row items-center">
        <Text className="capitalize font-poppins-medium text-disabled">
          {`${keyName}: `}
        </Text>
        <Text className="font-poppins-semiBold text-secondary-dark">
          {`R$ ${FormatValueToLocaleString(categoryChart.value)}`}
        </Text>
      </View>
    </View>
  )
}

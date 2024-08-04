import { cn } from '@/lib/utils'
import { DateOptionsProps } from '@/types/dateOptionsProps'
import { Text, TouchableOpacity, View } from 'react-native'

type Props = {
  dateOptions: DateOptionsProps[]
  handleOptionDate: (optionId: string) => void
  optionDateSelected: string
}

export const DateOptions = ({
  dateOptions,
  handleOptionDate,
  optionDateSelected,
}: Props) => {
  return (
    <View className="w-full bg-primary-Light py-1 px-3 flex-row justify-between items-center rounded-3xl">
      {dateOptions.map((item) => (
        <TouchableOpacity
          key={item.id}
          className={cn(
            'rounded-2xl h-12 w-24  justify-center items-center',
            optionDateSelected === item.id ? 'bg-secondary' : 'bg-none',
          )}
          onPress={() => handleOptionDate(item.id)}
        >
          <Text
            className="text-secondary-dark capitalize font-poppins-medium
        "
          >
            {item.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}

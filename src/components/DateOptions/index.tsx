import { colors } from '@/styles/colors'
import { DateOptionsProps } from '@/types/dateOptionsProps'
import { Text, TouchableOpacity, View } from 'react-native'

type Props = {
  dateOptions: DateOptionsProps[]
  handleOptionDate: (optionId: DateOptionsProps) => void
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
          className="rounded-2xl h-12 w-24  justify-center items-center"
          style={{
            backgroundColor:
              optionDateSelected === item.id ? colors.secondary : 'transparent',
          }}
          onPress={() => handleOptionDate(item)}
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

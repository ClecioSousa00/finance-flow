import { Keyboard, Pressable, Text } from 'react-native'

import { expenseContentProps } from '@/screens/appScreens/Register/expenseContent'

import { OptionTransaction } from '@/types/transactionProps'

import { colors } from '@/styles/colors'

type Props = {
  infos: expenseContentProps
  optionSelected: OptionTransaction | null
  handleOptionSelect: (optionName: OptionTransaction) => void
}

export const ExpenseButton = ({
  infos,
  optionSelected,
  handleOptionSelect,
}: Props) => {
  return (
    <Pressable
      className="w-44 h-[100px]  rounded-2xl items-center justify-center"
      style={{
        backgroundColor: colors.secondary,
        opacity: infos.name === optionSelected ? 1 : 0.5,
      }}
      onPress={() => {
        handleOptionSelect(infos.name as OptionTransaction)
        Keyboard.dismiss()
      }}
    >
      <infos.icon width={25} height={25} />
      <Text className="text-lg font-poppins-medium capitalize mt-1 text-primary">
        {infos.name}
      </Text>
      {/* <Text className="text-primary text-xl font-poppins-semiBold -mt-1">
        R$ 4,120.00
      </Text> */}
    </Pressable>
  )
}

import { Pressable, Text, View } from 'react-native'
import { Entypo } from '@expo/vector-icons'
import { colors } from '@/styles/colors'
import { InputGroup } from '../Input'
import { useState } from 'react'

const categoryList = [
  {
    categoryName: 'shopping',
    categoryColor: colors['category-shop'],
  },
  {
    categoryName: 'contas',
    categoryColor: colors['category-bills'],
  },
  {
    categoryName: 'renda',
    categoryColor: colors['category-income'],
  },
  {
    categoryName: 'comida',
    categoryColor: colors['category-food'],
  },
]

type DropDownProps = {
  handleSelectOptionTransaction: (option: string) => void
  optionTransaction: string
  // errorOption: boolean
}

export const DropDownCategories = ({
  handleSelectOptionTransaction,
  optionTransaction,
  // errorOption,
}: DropDownProps) => {
  const [openOptionList, setOptionList] = useState(false)
  return (
    <View>
      <Pressable
        className="bg-color-input h-14  flex-row items-center rounded-2xl justify-between px-4"
        onPress={() => setOptionList(!openOptionList)}
      >
        <Text className="text-disabled capitalize">{`${optionTransaction || 'selecionar categoria'}`}</Text>
        <Entypo name="chevron-small-down" size={24} color={colors.disabled} />
      </Pressable>
      {/* {errorOption && (
        <InputGroup.InputErrorMessage
          error={'Selecione a categoria'}
          className="ml-2 mt-1"
        />
      )} */}
      {openOptionList && (
        <View className=" rounded-lg bg-primary-Light mt-3 p-4 gap-2 justify-center">
          {categoryList.map((item) => (
            <Pressable
              key={item.categoryName}
              className=" w-full h-14 flex-row items-center gap-4 bg-color-input overflow-hidden rounded-lg"
              onPress={() => handleSelectOptionTransaction(item.categoryName)}
            >
              <View
                className="h-full w-1"
                style={{ backgroundColor: item.categoryColor }}
              ></View>
              <Text className="text-lg capitalize text-disabled">
                {item.categoryName}
              </Text>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  )
}

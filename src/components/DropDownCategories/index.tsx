import { useState } from 'react'
import { Keyboard, Pressable, Text, View } from 'react-native'

import { Entypo } from '@expo/vector-icons'

import { colors } from '@/styles/colors'

import { InputGroup } from '../Input'
import { ButtonCategories } from '../ButtonCategories'

import { categories, CategoryType } from '@/utils/categorieincons'

type DropDownProps = {
  handleSelectOptionCategory: (option: CategoryType) => void
  optionTransaction: CategoryType
  errorOptionTransaction: string
}

export const DropDownCategories = ({
  handleSelectOptionCategory,
  optionTransaction,
  errorOptionTransaction,
}: DropDownProps) => {
  const [openOptionList, setOptionList] = useState(false)

  const handleSelectCategory = (categoryName: CategoryType) => {
    handleSelectOptionCategory(categoryName)
    setOptionList(false)
    Keyboard.dismiss()
  }

  return (
    <View>
      <Pressable
        className="bg-primary-Light h-14  flex-row items-center rounded-2xl justify-between px-4"
        onPress={() => {
          setOptionList(!openOptionList)
          Keyboard.dismiss()
        }}
      >
        <Text
          className=" capitalize"
          style={{
            color: optionTransaction
              ? colors['secondary-dark']
              : colors.disabled,
          }}
        >
          {`${optionTransaction || 'selecionar categoria'}`}
        </Text>
        <Entypo name="chevron-small-down" size={24} color={colors.secondary} />
      </Pressable>
      {errorOptionTransaction && (
        <InputGroup.InputErrorMessage
          error={'Selecione a categoria'}
          className="ml-2 mt-1"
        />
      )}
      {openOptionList && (
        <View className="relative z-20">
          <View className=" rounded-lg bg-primary-Light mt-3 p-4 gap-2 justify-center absolute w-full flex-row flex-wrap">
            {Object.entries(categories).map(([key, IconComponent]) => {
              if (!IconComponent) return null

              return (
                <ButtonCategories
                  key={key}
                  name={key as CategoryType}
                  icon={IconComponent}
                  handleSelectCategory={() =>
                    handleSelectCategory(key as CategoryType)
                  }
                />
              )
            })}
          </View>
        </View>
      )}
    </View>
  )
}

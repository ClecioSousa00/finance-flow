import {
  FlatList,
  Pressable,
  Text,
  TouchableOpacity,
  View,
  ViewProps,
} from 'react-native'
import { colors } from '@/styles/colors'
import { Entypo } from '@expo/vector-icons'
import { ItemDropdown } from '@/screens/appScreens/Resume/dropDownItens'
import { useState } from 'react'
import { cn } from '@/lib/utils'

type Props = {
  inputValue: string
  dataDropdown: ItemDropdown[]
  handleSelectItemDropDown: (itemDropDown: ItemDropdown) => void
} & ViewProps

export const DropDownDate = ({
  inputValue,
  dataDropdown,
  handleSelectItemDropDown,
  className,
  ...rest
}: Props) => {
  const [openDropDown, setOpenDropDown] = useState(false)
  const optionAnualDropDownMonth = 'anual'
  return (
    <View className="relative">
      <Pressable
        className="bg-primary-Light h-14  flex-row items-center rounded-2xl justify-between px-4"
        onPress={() => setOpenDropDown((prevState) => !prevState)}
      >
        <Text className=" capitalize">{inputValue}</Text>
        <Entypo name="chevron-small-down" size={24} color={colors.secondary} />
      </Pressable>

      {openDropDown && (
        <View className="absolute w-full top-14 z-20">
          <View
            className={cn(
              'h-52  rounded-lg bg-primary-Light mt-3 p-4 gap-2  w-full ',
              className,
            )}
            {...rest}
          >
            <FlatList
              data={dataDropdown}
              keyExtractor={(data) => data.id}
              ItemSeparatorComponent={() => <View className="my-1" />}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) =>
                inputValue !== optionAnualDropDownMonth ||
                item.itemDropDown !== optionAnualDropDownMonth ? (
                  <TouchableOpacity
                    className="w-full bg-secondary h-8 justify-center rounded-md"
                    activeOpacity={0.7}
                    onPress={() => {
                      handleSelectItemDropDown(item)
                      setOpenDropDown(false)
                    }}
                  >
                    <Text className="capitalize text-primary text-center">
                      {item.itemDropDown}
                    </Text>
                  </TouchableOpacity>
                ) : null
              }
            />
          </View>
        </View>
      )}
    </View>
  )
}

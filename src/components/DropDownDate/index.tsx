import {
  FlatList,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { colors } from '@/styles/colors'
import { Entypo } from '@expo/vector-icons'
import { months } from '@/utils/DateFormat'

type Props = {
  value: string
}

export const DropDownDate = ({ value }: Props) => {
  return (
    <View>
      <Pressable className="bg-primary-Light h-14  flex-row items-center rounded-2xl justify-between px-4">
        <Text className=" capitalize">{value}</Text>
        <Entypo name="chevron-small-down" size={24} color={colors.secondary} />
      </Pressable>

      <View className="relative z-20">
        <View className="h-52  rounded-lg bg-primary-Light mt-3 p-4 gap-2 absolute  w-full ">
          <ScrollView>
            {months.map((monthly) => (
              <TouchableOpacity
                key={monthly.id}
                className="w-full bg-secondary/20 rounded-md p-1 mb-3"
                activeOpacity={0.7}
              >
                <Text className="capitalize text-secondary-dark">
                  {monthly.monthly}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          {/* <FlatList
            data={months}
            keyExtractor={(monthly) => monthly.id}
            ItemSeparatorComponent={() => <View className="my-1" />}
            renderItem={({ item }) => (
              <TouchableOpacity
                className="w-full bg-primary"
                activeOpacity={0.7}
              >
                <Text className="capitalize text-secondary-dark ">
                  {item.monthly}
                </Text>
              </TouchableOpacity>
            )}
          ></FlatList> */}
        </View>
      </View>
    </View>
  )
}

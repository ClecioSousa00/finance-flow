import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { Text, TouchableOpacity, View } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { colors } from '@/styles/colors'
import { cn } from '@/lib/utils'

export const CustomTabBar = ({
  state,
  navigation,
  descriptors,
  insets,
}: BottomTabBarProps) => {
  return (
    <View className="bg-green-200 w-full relative items-center">
      <View className="flex-row justify-evenly absolute bottom-3 rounded-lg w-11/12  bg-primary-Light">
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key]
          const isFocused = state.index === index
          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            })

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params)
            }
          }
          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            })
          }

          return (
            <TouchableOpacity
              key={index}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              className={cn(
                'p-5 rounded-lg items-center ',
                isFocused ? 'bg-secondary' : '',
              )}
            >
              <View>
                <View>
                  <AntDesign
                    name="home"
                    size={24}
                    color={isFocused ? colors.white : colors.disabled}
                  />
                </View>
              </View>
            </TouchableOpacity>
          )
        })}
      </View>
    </View>
  )
}

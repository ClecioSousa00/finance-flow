import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { TouchableOpacity, View, StyleSheet } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { colors } from '@/styles/colors'

type FontAwesomeIconName = keyof typeof FontAwesome.glyphMap

const iconsName: FontAwesomeIconName[] = [
  'home',
  'balance-scale',
  'edit',
  'pie-chart',
  'user',
]

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 18,
    paddingVertical: 16,
    borderRadius: 8,
  },
})

export const CustomTabBar = ({
  state,
  navigation,
  descriptors,
}: BottomTabBarProps) => {
  return (
    <View className=" w-full  items-center">
      <View
        className="flex-row justify-evenly absolute bottom-3 rounded-lg w-11/12 bg-primary-Light"
        style={{
          elevation: 4,
          shadowColor: '#000',
        }}
      >
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
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={[
                styles.container,
                {
                  backgroundColor: isFocused ? colors.secondary : 'transparent',
                },
              ]}
            >
              <FontAwesome
                name={iconsName[index]}
                size={24}
                color={isFocused ? colors.primary : colors.disabled}
              />
            </TouchableOpacity>
          )
        })}
      </View>
    </View>
  )
}

import { ContainerScreens } from '@/components/ContainerScreens'
import { Text, View } from 'react-native'
import LogoFinanceFlow from '@/assets/logoFinanceFlow.svg'
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { useEffect } from 'react'

export const Splash = () => {
  const splashAnimation = useSharedValue(0)

  const logoAnimation = useAnimatedStyle(() => {
    return {
      opacity: interpolate(splashAnimation.value, [0, 50], [0, 1]),
      transform: [
        {
          translateX: interpolate(splashAnimation.value, [0, 50], [25, 0]),
        },
      ],
    }
  })

  const nameLogoAnimation = useAnimatedStyle(() => {
    return {
      opacity: interpolate(splashAnimation.value, [0, 25, 50], [0, 0.5, 1]),
      transform: [
        {
          translateX: interpolate(splashAnimation.value, [0, 50], [50, 0]),
        },
      ],
    }
  })
  useEffect(() => {
    splashAnimation.value = withTiming(50, { duration: 1500 })
  })
  return (
    <ContainerScreens>
      <View className="justify-center items-center flex-1">
        <View className="justify-center items-end flex-row gap-2">
          <Animated.View style={logoAnimation}>
            <LogoFinanceFlow width={70} height={70} />
          </Animated.View>
          <Animated.View style={nameLogoAnimation}>
            <Text className="text-center capitalize text-white text-3xl font-poppins-semiBold">
              Finance
            </Text>
            <Text className="text-center capitalize text-white text-3xl font-poppins-semiBold">
              flow
            </Text>
          </Animated.View>
        </View>
      </View>
    </ContainerScreens>
  )
}

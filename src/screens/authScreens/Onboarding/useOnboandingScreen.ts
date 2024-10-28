import { useRef, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { AuthRouteProps } from '@/routes/auth.route'
import { onboardingSteps } from './dataOnboardingSteps'
import Swiper from 'react-native-swiper'

export const useOnboardingScreen = () => {
  const swiperRef = useRef<Swiper>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const isLastSlide = activeIndex === onboardingSteps.length - 1

  const navigation = useNavigation<AuthRouteProps>()

  const handleNextStep = () => {
    if (isLastSlide) {
      navigation.navigate('login')
      return
    }
    swiperRef.current?.scrollBy(1)
  }

  return {
    swiperRef,
    onboardingSteps,
    isLastSlide,
    handleNextStep,
    setActiveIndex,
  }
}

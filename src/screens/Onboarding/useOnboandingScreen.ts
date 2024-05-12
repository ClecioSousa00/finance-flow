import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { AuthRouteProps } from '@/routes/auth.route'
import { onboardingSteps } from './dataOnboardingSteps'

export const useOnboardingScreen = () => {
  const [onboardingScreenIndex, setOnboardingScreenIndex] = useState(0)
  const navigation = useNavigation<AuthRouteProps>()

  const dataScreen = onboardingSteps[onboardingScreenIndex]
  const lastStep = onboardingScreenIndex === onboardingSteps.length - 1

  const handleNextStep = () => {
    if (lastStep) {
      navigateLoginScreen()
      return
    }

    setOnboardingScreenIndex((prevState) => prevState + 1)
  }

  const navigateLoginScreen = () => {
    navigation.navigate('login')
  }

  return {
    dataScreen,
    onboardingSteps,
    onboardingScreenIndex,
    navigateLoginScreen,
    handleNextStep,
    lastStep,
  }
}

import { Image, Text, View } from 'react-native'

import { colors } from '@/styles/colors'

import { useOnboardingScreen } from './useOnboandingScreen'

import { Button } from '@/components/Button/Button'
import { ContainerScreens } from '@/components/ContainerScreens'
import { HeaderAppScreen } from '@/components/HeaderAppScreen'
import { Container } from '@/components/Container'

export const Onboarding = () => {
  const {
    dataScreen,
    handleNextStep,
    lastStep,
    onboardingScreenIndex,
    onboardingSteps,
  } = useOnboardingScreen()

  return (
    <ContainerScreens>
      <HeaderAppScreen className="pt-6">
        <Text className="text-3xl font-poppins-medium text-primary text-center">
          {dataScreen.title}
        </Text>
      </HeaderAppScreen>
      <Container>
        <View className="items-center justify-center h-full gap-10">
          <Image source={dataScreen.img} alt="" width={40} />
          <View className="flex-row gap-[6px]">
            {onboardingSteps.map((_, index) => (
              <View
                key={`onboarding-step-${index}`}
                style={{
                  backgroundColor:
                    index === onboardingScreenIndex
                      ? colors.secondary
                      : colors.disabled,
                  width: 36,
                  height: 10,
                  borderRadius: 6,
                }}
              />
            ))}
          </View>
          <Button
            onPress={handleNextStep}
            activeOpacity={0.7}
            label={lastStep ? 'Começar' : 'Próximo'}
            className="w-full"
          />
        </View>
      </Container>
    </ContainerScreens>
  )
}

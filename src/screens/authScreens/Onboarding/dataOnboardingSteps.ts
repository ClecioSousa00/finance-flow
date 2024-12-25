import onboardingFirstStep from '../../../assets/onboardingImgs/onboandinStep1.png'
import onboardingSecondStep from '../../../assets/onboardingImgs/onboardingStep2.png'

import firstAnimationOnboarding from '../../../LottieFiles/fistAnimation.json'
import secondAnimationOnboarding from '../../../LottieFiles/secondAnimationOnboarding.json'

export const onboardingSteps = [
  {
    img: onboardingFirstStep,
    title: 'Bem-vindo ao Gerenciador de Despesas',
    path: firstAnimationOnboarding,
  },
  {
    img: onboardingSecondStep,
    title: 'Controle seus gastos de forma simples e eficaz',
    path: secondAnimationOnboarding,
  },
]

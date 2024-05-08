import { NavigationContainer } from '@react-navigation/native'
import { ReactElement } from 'react'
import { RenderOptions, render } from '@testing-library/react-native'

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return <NavigationContainer>{children}</NavigationContainer>
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react-native'
export { customRender as render }

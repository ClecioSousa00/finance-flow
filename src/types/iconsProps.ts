import { SvgProps } from 'react-native-svg'
export type OptionsIconUser = {
  name: string
  icon: React.FC<SvgProps>
  handlePress: () => void
}

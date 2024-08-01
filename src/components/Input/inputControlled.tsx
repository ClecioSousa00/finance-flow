import { TextInput, TextInputProps } from 'react-native'

export const InputControlled = ({ ...rest }: TextInputProps) => {
  return <TextInput className="flex-1 pr-4" {...rest} />
}

import { TextInput, TextInputProps } from 'react-native'
import { Controller, FieldValues, UseControllerProps } from 'react-hook-form'
import { colors } from '@/styles/colors'

type InputProps = {
  name: string
} & TextInputProps

export const Input = <FormType extends FieldValues>({
  name,
  control,
  ...rest
}: UseControllerProps<FormType> & InputProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, onBlur, value } }) => (
        <TextInput
          className="flex-1 pr-4 text-secondary-dark"
          placeholderTextColor={colors.disabled}
          onBlur={onBlur}
          onChangeText={onChange}
          value={value}
          {...rest}
        />
      )}
    />
  )
}

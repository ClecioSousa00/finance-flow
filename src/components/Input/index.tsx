import { TextInput, TextInputProps, View } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { Controller, FieldValues, UseControllerProps } from 'react-hook-form'
import { cn } from '@/lib/utils'

type InputProps = {
  FeatherIconName?: keyof typeof Feather.glyphMap
  name: string
} & TextInputProps

export const Input = <FormType extends FieldValues>({
  FeatherIconName,
  name,
  control,
  className,
  ...rest
}: UseControllerProps<FormType> & InputProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, onBlur, value } }) => (
        <View
          className={cn(
            'bg-white h-14 flex-row items-center rounded-2xl  px-4',
            className,
          )}
        >
          <TextInput
            className="flex-1 pr-4"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            {...rest}
          />
          {FeatherIconName && (
            <Feather name={FeatherIconName} size={24} color="#91919F" />
          )}
        </View>
      )}
    />
  )
}

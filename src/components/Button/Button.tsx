import { type VariantProps, cva } from 'class-variance-authority'
import { ActivityIndicator, Text, TouchableOpacity } from 'react-native'

import { cn } from '../../lib/utils'

const buttonVariants = cva('flex-row items-center justify-center rounded-md', {
  variants: {
    variant: {
      default: 'bg-secondary rounded-full',
      outline: 'bg-transparent border-2 border-primary-Light rounded-full',
      secondary: 'bg-secondary',
      danger: 'bg-danger rounded-full',
      ghost: 'bg-slate-700',
      link: 'text-secondary underline-offset-4',
    },
    size: {
      default: 'h-14 px-4',
      sm: 'h-8 px-2',
      lg: 'h-12 px-8',
      link: 'px-0',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
})

const buttonTextVariants = cva('text-center font-poppins-semiBold', {
  variants: {
    variant: {
      default: 'text-white',
      outline: 'text-white',
      secondary: 'text-secondary-foreground',
      danger: 'text-primary',
      ghost: 'text-primary-foreground',
      link: 'text-secondary underline',
    },
    size: {
      default: 'text-base',
      sm: 'text-sm',
      lg: 'text-xl',
      link: 'text-base',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
})

interface ButtonProps
  extends React.ComponentPropsWithoutRef<typeof TouchableOpacity>,
    VariantProps<typeof buttonVariants> {
  label: string
  labelClasses?: string
  isLoading?: boolean
}
function Button({
  label,
  labelClasses,
  className,
  variant,
  size,
  isLoading = false,
  ...props
}: ButtonProps) {
  return (
    <TouchableOpacity
      className={cn(buttonVariants({ variant, size, className }))}
      activeOpacity={0.7}
      {...props}
    >
      {!isLoading && (
        <Text
          className={cn(
            buttonTextVariants({ variant, size, className: labelClasses }),
          )}
        >
          {label}
        </Text>
      )}
      {isLoading && <ActivityIndicator color={'white'} />}
    </TouchableOpacity>
  )
}

export { Button, buttonVariants, buttonTextVariants }

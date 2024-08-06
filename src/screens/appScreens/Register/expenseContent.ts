import IncomeIcon from '@/assets/incomeWith.svg'
import ExpanseIcon from '@/assets/ExpenseWhite.svg'
import { SvgProps } from 'react-native-svg'

export type expenseContentProps = {
  icon: React.FC<SvgProps>
  name: 'renda' | 'despesa'
}

export type OptionTransaction = 'renda' | 'despesa'

export const expenseContent: expenseContentProps[] = [
  {
    icon: IncomeIcon,
    name: 'renda',
  },
  {
    icon: ExpanseIcon,
    name: 'despesa',
  },
]

import { CategoryType } from '@/utils/categorieincons'

export type OptionTransaction = 'renda' | 'despesa'

export type Transaction = {
  id: string
  price: string
  categoria: CategoryType
  fullDate: string
  year: string
  month: string
  name: string
  optionTransaction: OptionTransaction
}

export type GroupedTransaction = {
  title: string
  data: Transaction[]
}

export type TransactionsPieChart = {
  value: number
  color: string
  label: string
}

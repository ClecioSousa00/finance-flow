export type OptionTransaction = 'renda' | 'despesa'

export type Transaction = {
  id: string
  price: string
  categoria: string
  fullDate: string
  year: string
  month: string
  name: string
  optionTransaction: OptionTransaction
}

export type GroupedTransaction = {
  month: string
  transactions: Transaction[]
}

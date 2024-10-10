import { formatDate } from '@/utils/DateFormat'

export type ItemDropdown = {
  id: string
  itemDropDown: string
}

const { year } = formatDate()

export const monthsDropDown: ItemDropdown[] = [
  { itemDropDown: 'anual', id: '001' },
  { itemDropDown: 'janeiro', id: '01' },
  { itemDropDown: 'fevereiro', id: '02' },
  { itemDropDown: 'março', id: '03' },
  { itemDropDown: 'abril', id: '04' },
  { itemDropDown: 'maio', id: '05' },
  { itemDropDown: 'junho', id: '06' },
  { itemDropDown: 'julho', id: '07' },
  { itemDropDown: 'agosto', id: '08' },
  { itemDropDown: 'setembro', id: '09' },
  { itemDropDown: 'outubro', id: '10' },
  { itemDropDown: 'novembro', id: '11' },
  { itemDropDown: 'dezembro', id: '12' },
]

// TODO: Por uma lista de anos de transações
export const yearsDropDown: ItemDropdown[] = [{ itemDropDown: year, id: '1' }]

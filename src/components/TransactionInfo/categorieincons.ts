import Shopping from '@/assets/categorieIncons/ShoppingCategorie.svg'
import Food from '@/assets/categorieIncons/FoodCategorie.svg'
import Bills from '@/assets/categorieIncons/BillsCategorie.svg'
import Income from '@/assets/categorieIncons/IncomeCategorie.svg'
import Gym from '@/assets/categorieIncons/GymCategorie.svg'
import Marketplace from '@/assets/categorieIncons/Marketplace.svg'
import Medicine from '@/assets/categorieIncons/MedicineCategorie.svg'
import Transport from '@/assets/categorieIncons/TransportCategorie.svg'

export type CategoryType =
  | 'shopping'
  | 'comida'
  | 'contas'
  | 'renda'
  | 'academia'
  | 'mercado'
  | 'medicamento'
  | 'transporte'

export const categories = {
  shopping: Shopping,
  comida: Food,
  contas: Bills,
  renda: Income,
  academia: Gym,
  mercado: Marketplace,
  medicamento: Medicine,
  transporte: Transport,
}

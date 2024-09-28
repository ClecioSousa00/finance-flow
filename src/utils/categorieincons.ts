import Shopping from '@/assets/categorieIncons/ShoppingCategorie.svg'
import Food from '@/assets/categorieIncons/FoodCategorie.svg'
import Bills from '@/assets/categorieIncons/BillsCategorie.svg'
import Income from '@/assets/categorieIncons/IncomeCategorie.svg'
import Gym from '@/assets/categorieIncons/GymCategorie.svg'
import Marketplace from '@/assets/categorieIncons/Marketplace.svg'
import Medicine from '@/assets/categorieIncons/MedicineCategorie.svg'
import Transport from '@/assets/categorieIncons/TransportCategorie.svg'

// Importar SvgProps de 'react-native-svg'
import { SvgProps } from 'react-native-svg'

export type CategoryType =
  | 'shopping'
  | 'comida'
  | 'contas'
  | 'renda'
  | 'academia'
  | 'mercado'
  | 'medicamento'
  | 'transporte'
  | ''

export const categories: Record<CategoryType, React.FC<SvgProps> | undefined> =
  {
    shopping: Shopping,
    comida: Food,
    contas: Bills,
    renda: Income,
    academia: Gym,
    mercado: Marketplace,
    medicamento: Medicine,
    transporte: Transport,
    '': undefined, // Adiciona a opção de string vazia
  } as const

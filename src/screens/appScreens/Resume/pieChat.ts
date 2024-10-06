export type CategoryPieChartType =
  | 'shopping'
  | 'comida'
  | 'contas'
  | 'academia'
  | 'mercado'
  | 'medicamento'
  | 'transporte'
export const pieChartColors: Record<CategoryPieChartType, string> = {
  academia: '#A3E4DB',
  comida: '#1EB896',
  contas: '#40C4D5',
  medicamento: '#8579B6',
  mercado: '#BE7CB4',
  shopping: '#F172AA',
  transporte: '#F57A76',
}

export const formatPrice = (price: string) => {
  const numericString = price.replace(/[^\d]/g, '')

  const numericPrice = parseFloat(numericString) / 100

  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(numericPrice)
}

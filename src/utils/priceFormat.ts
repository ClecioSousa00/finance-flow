export const formatPrice = (price: string) => {
  if (!price) return '0'
  const numericString = price.replace(/[^\d]/g, '')

  const numericPrice = parseFloat(numericString) / 100

  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(numericPrice)
}

export const FormatValueToLocaleString = (value: number) => {
  const option = {
    style: 'decimal',
    maximumFractionDigits: 2, // Número máximo de casas decimais
    minimumFractionDigits: 2, // Número mínimo de casas decimais
    useGrouping: true, // Usar separador de milhares
  }

  // Formata o número de acordo com as opções
  return value.toLocaleString('pt-BR', option)
}

export const formattedValueInput = (value: string) => {
  if (value) {
    const valueFormatted = (parseFloat(value) / 100).toFixed(2)
    return FormatValueToLocaleString(Number(valueFormatted))
  }
  return ''
}

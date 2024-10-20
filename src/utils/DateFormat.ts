export const months = [
  { monthly: 'janeiro', id: '01' },
  { monthly: 'fevereiro', id: '02' },
  { monthly: 'março', id: '03' },
  { monthly: 'abril', id: '04' },
  { monthly: 'maio', id: '05' },
  { monthly: 'junho', id: '06' },
  { monthly: 'julho', id: '07' },
  { monthly: 'agosto', id: '08' },
  { monthly: 'setembro', id: '09' },
  { monthly: 'outubro', id: '10' },
  { monthly: 'novembro', id: '11' },
  { monthly: 'dezembro', id: '12' },
]

export const monthlyFormatted = (monthlyId: string) => {
  const monthly = months.find((item) => item.id === monthlyId)
  return monthly?.monthly
}

export const getDayFromDate = (dateString: string) => {
  const parts = dateString.split('/')
  const day = parts[0]
  return day
}

export const formatDate = () => {
  const date = new Date()
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear().toString()

  return {
    fullDate: `${day}/${month}/${year}`,
    month,
    year,
    day,
  }
}

export const getCurrentWeekDays = () => {
  const today = new Date()
  const currentDay = today.getDate()

  const startDay = Math.max(1, currentDay - 6)

  return Array.from({ length: currentDay - startDay + 1 }, (_, i) => {
    const day = startDay + i
    return day.toString().padStart(2, '0')
  })
}

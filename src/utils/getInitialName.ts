export const getInitialName = (userName: string) => {
  const names = userName.trim().split(' ')

  const initialName = names
    .map((name) => name[0])
    .join('')
    .slice(0, 2)
  return initialName
}

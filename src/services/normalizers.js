export const fullName = (val) => {
  if (!val || typeof val !== 'string') return null
  return val.trim()
    .replace(/\s+/g, ' ')
    .toUpperCase()
}

export const street = (val) => {
  if (!val || typeof val !== 'string') return null
  return val.trim()
    .replace(/\s+/g, ' ')
    .toUpperCase()
}

const getPercentageChange = (isIncreased, a, b) => {
  let divideBy = a
  if (isIncreased) {
    divideBy = b
  }
  const calc = ((a - b) / divideBy) * 100

  return calc || 100
}

export default getPercentageChange

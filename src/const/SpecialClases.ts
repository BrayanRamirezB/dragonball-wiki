interface SpecialCases {
  previous: Record<number, number>
  next: Record<number, number>
}

const specialCases: SpecialCases = {
  previous: {
    63: 44,
    42: 40,
    37: 35
  },
  next: {
    35: 37,
    40: 42,
    44: 63
  }
}

export const getPreviousFighter = (id: number): number => {
  if (id > 1) {
    return specialCases.previous[id] || id - 1
  }
  return 78
}

export const getNextFighter = (id: number): number => {
  if (id < 78) {
    return specialCases.next[id] || id + 1
  }
  return 1
}

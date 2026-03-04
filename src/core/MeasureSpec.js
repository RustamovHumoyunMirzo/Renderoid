export const MeasureMode = {
  EXACT: 'exact',
  AT_MOST: 'at_most',
  UNSPECIFIED: 'unspecified'
}

export function makeMeasureSpec(size, mode) {
  return { size, mode }
}
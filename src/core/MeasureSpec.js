export const MeasureSpecMode = {
  UNSPECIFIED: 0,
  EXACTLY: 1,
  AT_MOST: 2
}

export function makeMeasureSpec(size, mode) {
  return { size, mode }
}

export function getMode(measureSpec) {
  return measureSpec.mode
}

export function getSize(measureSpec) {
  return measureSpec.size
}
export class LayoutParams {
  constructor(props = {}) {
    this.width = props.width ?? 'wrap_content'
    this.height = props.height ?? 'wrap_content'

    this.weight = parseFloat(props.weight || 0)

    this.margin = parseBox(props.margin)
    this.padding = parseBox(props.padding)

    this.background = props.background || null
  }
}

function parseBox(value) {
  if (!value) return { top: 0, right: 0, bottom: 0, left: 0 }

  const num = parseInt(value)

  return {
    top: num,
    right: num,
    bottom: num,
    left: num
  }
}
import { View } from './View.js'

export class TextView extends View {
  constructor(props = {}) {
    super(props)
    this.text = props.text || ''
    this.textColor = props.textColor || '#000'
    this.fontSize = props.fontSize || 16
    this.fontFamily = props.fontFamily || 'Arial'
  }

  measure(widthMeasureSpec, heightMeasureSpec) {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    ctx.font = `${this.fontSize}px ${this.fontFamily}`
    const metrics = ctx.measureText(this.text)

    this.measuredWidth = metrics.width
    this.measuredHeight = this.fontSize * 1.2
  }

  draw(ctx) {
    super.draw(ctx)

    ctx.fillStyle = this.textColor
    ctx.font = `${this.fontSize}px ${this.fontFamily}`
    ctx.textBaseline = 'top'

    ctx.fillText(this.text, this.left, this.top)
  }

  toXML() {
    return `<TextView
  android:layout_width="${this.layoutWidth}"
  android:layout_height="${this.layoutHeight}"
  android:text="${this.text}"
/>`
  }
}
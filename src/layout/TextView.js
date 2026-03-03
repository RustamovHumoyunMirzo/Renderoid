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
    
    let desiredWidth = metrics.width
    let desiredHeight = this.fontSize * 1.2
    
    const widthMode = widthMeasureSpec.mode
    const heightMode = heightMeasureSpec.mode
    
    this.measuredWidth = this.resolveSize(desiredWidth, widthMode, widthMeasureSpec.size, true)
    this.measuredHeight = this.resolveSize(desiredHeight, heightMode, heightMeasureSpec.size, false)
  }

  draw(ctx) {
    super.draw(ctx)

    ctx.fillStyle = this.textColor
    ctx.font = `${this.fontSize}px ${this.fontFamily}`
    ctx.textBaseline = 'top'

    const x = this.left + (this.padding?.left || 0)
    const y = this.top + (this.padding?.top || 0)

    ctx.fillText(this.text, x, y)
  }

  toXML() {
    return `<TextView
  android:layout_width="${this.layoutWidth}"
  android:layout_height="${this.layoutHeight}"
  android:text="${this.text}"
/>`
  }
}
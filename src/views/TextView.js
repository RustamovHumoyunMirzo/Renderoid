import { View } from '../core/View.js'
import { registerView } from '../core/ViewRegistry.js'

export class TextView extends View {

  static tag = 'TextView'

  constructor(props = {}) {
    super(props)

    this.text = props.text || ''
    this.fontSize = parseInt(props.fontSize || 16)
    this.textColor = props.textColor || '#000'
  }

  measure(context) {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    ctx.font = `${this.fontSize}px sans-serif`
    
    const metrics = ctx.measureText(this.text)
    
    this.measuredWidth = metrics.width
    
    const ascent = metrics.actualBoundingBoxAscent || this.fontSize
    const descent = metrics.actualBoundingBoxDescent || 0
    
    this.measuredHeight = ascent + descent
  }

  onDraw(ctx) {
    ctx.fillStyle = this.textColor
    ctx.font = `${this.fontSize}px sans-serif`
    ctx.textBaseline = 'top'
    ctx.fillText(this.text, this.left, this.top)
  }
}

registerView(TextView.tag, TextView)
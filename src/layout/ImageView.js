import { View } from './View.js'

export class ImageView extends View {
  constructor(props = {}) {
    super(props)
    this.src = props.src || null
    this.scaleType = props.scaleType || 'fitXY'
  }

  measure(widthMeasureSpec, heightMeasureSpec) {
    const img = new Image()
    img.src = this.src || ''
    const naturalWidth = img.naturalWidth || 100
    const naturalHeight = img.naturalHeight || 100

    this.measuredWidth = this.resolveSize(naturalWidth, widthMeasureSpec.mode, widthMeasureSpec.size)
    this.measuredHeight = this.resolveSize(naturalHeight, heightMeasureSpec.mode, heightMeasureSpec.size)
  }

  draw(ctx) {
    super.draw(ctx)
    if (!this.src) return

    const img = new Image()
    img.src = this.src
    img.onload = () => {
      let drawWidth = this.measuredWidth
      let drawHeight = this.measuredHeight

      if (this.scaleType === 'centerCrop') {
        const scale = Math.max(this.measuredWidth / img.width, this.measuredHeight / img.height)
        drawWidth = img.width * scale
        drawHeight = img.height * scale
      }

      const offsetX = (this.measuredWidth - drawWidth) / 2
      const offsetY = (this.measuredHeight - drawHeight) / 2

      ctx.drawImage(img, this.left + offsetX, this.top + offsetY, drawWidth, drawHeight)
    }
  }

  toXML() {
    return `<ImageView
  android:layout_width="${this.layoutWidth}"
  android:layout_height="${this.layoutHeight}"
  android:src="${this.src}"
  android:scaleType="${this.scaleType}"
/>`
  }
}
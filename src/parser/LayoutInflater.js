import { LinearLayout } from '../layout/LinearLayout.js'
import { TextView } from '../layout/TextView.js'
import { ImageView } from '../layout/ImageView.js'
import { parseXML } from './XMLParser.js'

export function inflateXMLNode(node) {
  if (!['LinearLayout','TextView','ImageView'].includes(node.nodeName)) return null
  const attrs = {}

  for (let i = 0; i < node.attributes.length; i++) {
    const attr = node.attributes[i]
    const name = attr.name.replace(/^android:/, '')
    attrs[name] = attr.value
  }

  let view

  switch (node.nodeName) {
    case 'LinearLayout':
      view = new LinearLayout({
        layoutWidth: attrs.layout_width,
        layoutHeight: attrs.layout_height,
        orientation: attrs.orientation
      })
      break
    case 'TextView':
      view = new TextView({
        layoutWidth: attrs.layout_width,
        layoutHeight: attrs.layout_height,
        text: attrs.text,
        textColor: attrs.textColor,
        fontSize: attrs.fontSize ? parseInt(attrs.fontSize) : undefined
      })
      break
    case 'ImageView':
      view = new ImageView({
        layoutWidth: attrs.layout_width,
        layoutHeight: attrs.layout_height,
        src: attrs.src,
        scaleType: attrs.scaleType
      })
      break
    default:
      console.warn(`Unknown tag: ${node.nodeName}, defaulting to View`)
      view = new LinearLayout({
        layoutWidth: attrs.layout_width,
        layoutHeight: attrs.layout_height
      })
      break
  }

  const parseSpacing = (value) => {
    if (!value) return { left:0, top:0, right:0, bottom:0 }
    const parts = value.split(',').map(Number)
    switch(parts.length) {
      case 1: return { left:parts[0], top:parts[0], right:parts[0], bottom:parts[0] }
      case 2: return { left:parts[0], top:parts[1], right:parts[0], bottom:parts[1] }
      case 4: return { left:parts[0], top:parts[1], right:parts[2], bottom:parts[3] }
      default: return { left:0, top:0, right:0, bottom:0 }
    }
  }

  view.margin = parseSpacing(attrs.margin)
  view.padding = parseSpacing(attrs.padding)

  node.childNodes.forEach(childNode => {
    if (childNode.nodeType === 1) {
      const childView = inflateXMLNode(childNode)
      view.addView(childView)
    }
  })

  return view
}

export function inflateXMLString(xmlString) {
  const cleanedXML = xmlString.replace(/android:/g, '')
  
  const rootNode = parseXML(cleanedXML)
  return inflateXMLNode(rootNode)
}